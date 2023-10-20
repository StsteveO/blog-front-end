//eslint-disable-next-line
import { useState, useEffect } from "react";
//eslint-disable-next-line
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const UserDashboard = ({ updateArticleToEdit }) => {

  const [userArticles, setUserArticles] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState();
  const [articleToDelete, setArticleToDelete] = useState();
  const [articleToEdit, setArticleToEdit] = useState();
  const [errors, setErrors] = useState([]);
  //eslint-disable-next-line
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  function decodeHTMLString(encodedHTMLString) {
    let parser = new DOMParser();
    let dom = parser.parseFromString(
      "<!doctype html><body>" + encodedHTMLString,
      "text/html"
    );
    return dom.body.textContent;
  }

  useEffect(() => {
    // console.log("articleToEdit has changed");
    console.log(articleToEdit);
    if (articleToEdit){
      console.log("not empty");
      updateArticleToEdit(articleToEdit);
    }
  }, [articleToEdit]);

  useEffect(() => {
    if (!authToken) {
      navigate("/login"); // Redirect to login page if authToken is missing
    }
  }, [authToken, navigate]);

  // console.log(`authToken: ${authToken}`);
  //eslint-disable-next-line
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  useEffect(() => {
    fetch("http://localhost:3000/blog/articles_user", {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const userArticlesData = data.map((article) => {
          return {
            articleId: article._id,
            title: article.title,
            preview: decodeHTMLString(article.preview),
            category: article.category.name,
            categoryId: article.category._id,
            author: article.author.first_name,
            authorId: article.author._id,
            picture_decoded: decodeHTMLString(article.article_picture),
            picture_credit: article.picture_credit,
            article_body: decodeHTMLString(article.article_body),
            isActive: article.article_is_active,
          };
        });
        setUserArticles(userArticlesData);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); //remove token from client storage
    localStorage.removeItem("userId"); //remove id from client storage
    navigate("/");
  };

  const handleNewCategory = () => {
    navigate("/newCategory");
  };

  const handleNewArtical = () => {
    navigate("/newArtical");
  };

  const toggleModal = (event) => {
    if (event.target.id) {
      setArticleToDelete(event.target.id);

      setSelectedArticle(
        userArticles.find((article) => {
          return article.articleId === event.target.id;
        })
      );
    }
    setModal(!modal);
  };

  const startArticleEdit = (event) => {
    if (event.target.id) {
      let findArticle = userArticles.find((article) => {
        return article.articleId === event.target.id;
      });
      setArticleToEdit(findArticle);
    }
    // updateArticleToEdit(articleToEdit);
  };

  const deletePost = async () => {
    console.log(articleToDelete);
    let articleToDeleteObj = { articleToDelete: articleToDelete };
    const response = await fetch("http://localhost:3000/blog/article_delete", {
      method: "POST",
      body: JSON.stringify(articleToDeleteObj),
      headers: headers,
    });

    if (response.status === 200) {
      let responseData = await response.json();
      console.log(responseData);
    }
    if (response.status === 400) {
      let responseData = await response.json();
      setErrors([responseData.errors]);
    }
    if (response.status === 401) {
      let responseData = await response.json();
      setErrors([responseData.errors]);
    }
    if (response.status === 500) {
      let responseData = await response.json();
      setErrors([responseData.errors]);
    }

    setArticleToDelete("");
    setSelectedArticle("");
    setModal(false);
    location.reload();
  };

  return (
    <>
      {errors.length > 0 && (
        <div className="notification is-danger is-size-4">
          <p>Validation Errors</p>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}
      <div className={modal ? "modal is-active" : "modal"}>
        <div className="modal-background" onClick={toggleModal}></div>
        <div className="modal-content box">
          <div className="title mb-1">This is a DESTRUCTIVE ACT!</div>
          <div>This act cannot be undone</div>
          <div className="subtitle is-underlined">
            Are you sure you want to DELETE the following post:
          </div>

          {modal && (
            <article className="media box">
              <figure className="media-left">
                <p className="image is-64x64 is-clipped">
                  <img
                    src={selectedArticle.picture_decoded}
                    alt="article picture"
                  />
                </p>
              </figure>

              <div className="media-content">
                <div className="content">
                  <div className="title">{selectedArticle.title}</div>

                  {selectedArticle.isActive ? (
                    <div className="tag is-primary">Active</div>
                  ) : (
                    <div className="tag is-warning">Not Active</div>
                  )}
                  <div className="tag">{selectedArticle.category}</div>

                  <div className="subtitle">{selectedArticle.author}</div>
                </div>
              </div>
            </article>
          )}

          <div className="buttons are-medium">
            <button
              className="button is-danger"
              onClick={deletePost} //delete
            >
              <span>Delete</span>
            </button>
            <button
              className="button is-dark"
              onClick={toggleModal} //cancel delete
            >
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>

      {/* {console.log(userArticles)} */}
      <section className="section">
        <div className="title">User Dashboard</div>

        <div className="buttons are-medium">
          <button className="button is-link" onClick={handleNewArtical}>
            <span className="icon">
              <i className="fas fa-plus"></i>
            </span>
            <span>New Blog Artical</span>
          </button>

          <button className="button is-link" onClick={handleNewCategory}>
            <span className="icon">
              <i className="fas fa-plus"></i>
            </span>
            <span>New Category</span>
          </button>

          <button className="button is-link" onClick={handleLogout}>
            <span className="icon">
              <i className="fas fa-right-from-bracket"></i>
            </span>
            <span>Log out</span>
          </button>
        </div>
      </section>

      <div className="section is-medium pt-4">
        <div className="container">
          {userArticles.map((article) => {
            return (
              <article key={article.articleId} className="media box">
                <figure className="media-left">
                  <p className="image is-64x64 is-clipped">
                    <img src={article.picture_decoded} alt="article picture" />
                  </p>
                </figure>

                <div className="media-content">
                  <div className="content">
                    <div className="title">{article.title}</div>

                    {article.isActive ? (
                      <div className="tag is-primary">Active</div>
                    ) : (
                      <div className="tag is-warning">Not Active</div>
                    )}
                    <div className="tag">{article.category}</div>

                    <div className="subtitle">{article.author}</div>
                    <div className="buttons">
                      <button
                        className="button is-link"
                        onClick={startArticleEdit} //edit post
                      >
                        <span className="icon">
                          <i className="fas fa-pencil"></i>
                        </span>
                        <span id={article.articleId}>Edit</span>
                      </button>

                      <button
                        className="button is-danger"
                        onClick={toggleModal} //toggle delete modal
                      >
                        <span className="icon">
                          <i className="fas fa-trash"></i>
                        </span>
                        <span id={article.articleId}>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <section className="section">
        <button className="button is-link is-medium" onClick={handleLogout}>
          <span className="icon">
            <i className="fas fa-right-from-bracket"></i>
          </span>
          <span>Log out</span>
        </button>
      </section>
    </>
  );
};
export default UserDashboard;

UserDashboard.propTypes = {
  updateArticleToEdit: PropTypes.any.isRequired,
};