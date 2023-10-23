//eslint-disable-next-line
import { useState, useEffect } from "react";
//eslint-disable-next-line
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const UserDashboard = ({ updateArticleToEdit, updateCategoryToEdit }) => {

  const [userArticles, setUserArticles] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState();
  const [articleToDelete, setArticleToDelete] = useState();
  const [articleToEdit, setArticleToEdit] = useState();
  const [errors, setErrors] = useState([]);
  const [allCategories, setAllCategories]= useState([]);
  const [categoryDropdown, setCategoryDropdown]= useState(false);
  const [categoryModal, setCategoryModal]= useState(false);
  const [selectedCategoryId, setSelectedCategoryId]= useState();
  const [selectedCategory, setSelectedCategory]= useState();
  const [selectedCategoryToEdit, setSelectedCategoryToEdit] = useState();
  const [accountModal, setAccountModal]= useState(false);

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
    console.log(selectedCategoryToEdit);
    if (selectedCategoryToEdit) {
      updateCategoryToEdit(selectedCategoryToEdit);
    }
  }, [selectedCategoryToEdit]);

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
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (response.status === 401) {
          // Handle the 401 status here
          console.error("Unauthorized. Please log in.");
          navigate("/login");
        }
        return response.json();
      })
      // .then((data) => {
      //   // Process the response data (if status is not 401)
      //   console.log(data);
      // })
      .catch((error) => {
        // Handle other errors (e.g., network errors)
        console.error("Fetch error:", error);
      });
  }, []);


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

  useEffect(() => {
    fetch("http://localhost:3000/blog/category_list", {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const categoryList = data.map((category) => {
          return {
            categoryName: category.name,
            categorySynopsis: category.synopsis,
            categoryId: category._id,
          };
        });
        setAllCategories(categoryList);
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

  const handleEditAccount= () =>{
    navigate("/editAccount");
  }

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

  const toggleCategoryModal= (event)=>{
    if(event.target.id){
      setSelectedCategoryId(event.target.id);

      setSelectedCategory(
        allCategories.find((category)=>{
          return category.categoryId === event.target.id;
        })
      )
    }
    setCategoryModal(!categoryModal)
  }

  const toggleAccountModal= ()=>{
    setAccountModal(!accountModal);
  }

  const toggleCategoryDropdown= () =>{
    setCategoryDropdown(!categoryDropdown)
  }

  const startArticleEdit = (event) => {
    if (event.target.id) {
      let findArticle = userArticles.find((article) => {
        return article.articleId === event.target.id;
      });
      setArticleToEdit(findArticle);
    }
    // updateArticleToEdit(articleToEdit);
  };

  const startCategoryEdit= (event) =>{
    if(event.target.id){
      setSelectedCategoryToEdit(
        allCategories.find((category) => {
          return category.categoryId === event.target.id;
        })
      );
    }
    console.log(selectedCategoryToEdit);
  }

  const deleteCategory= async () =>{
    console.log (selectedCategoryId);
    let categoryIdToDelete = { categoryIdToDelete: selectedCategoryId };

    const response = await fetch("http://localhost:3000/blog/category_delete", {
      method: "POST",
      body: JSON.stringify(categoryIdToDelete),
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

    setSelectedCategoryId("");
    setSelectedCategory("");
    setCategoryDropdown(false);
    location.reload();
  }

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

  const deleteAccount= async ()=>{
    const response = await fetch("http://localhost:3000/blog/account_delete", {
      method: "GET",
      headers: headers,
    });

    if (response.status === 200) {
      let responseData = await response.json();
      console.log(responseData);
      navigate("/");
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
  }

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

        <div className="buttons are-medium">
          <button className="button is-link" onClick={handleEditAccount}>
            <span className="icon">
              <i className="fas fa-pencil"></i>
            </span>
            <span>Edit Account</span>
          </button>

          <button className="button is-danger" onClick={toggleAccountModal}>
            <span className="icon">
              <i className="fas fa-triangle-exclamation"></i>
            </span>
            <span>Delete Account</span>
          </button>
        </div>
      </section>

      {/* ACCOUNT MODAL */}

      <div className={accountModal ? "modal is-active" : "modal"}>
        <div className="modal-background" onClick={toggleAccountModal}></div>
        <div className="modal-content box">
          <div className="title mb-1">This is a DESTRUCTIVE ACT!</div>
          <div>Deleting your account will delete all assosiated articles</div>
          <div>This act cannot be undone</div>
          <div className="subtitle is-underlined">
            Are you sure you want to DELETE your account?
          </div>

          <div className="buttons are-medium">
            <button
              className="button is-danger"
              onClick={deleteAccount} //delete
            >
              <span>Delete</span>
            </button>
            <button
              className="button is-dark"
              onClick={toggleAccountModal} //cancel delete
            >
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>

      {/* WORKING ON CATEGORY MODAL */}

      <div className={categoryModal ? "modal is-active" : "modal"}>
        <div className="modal-background" onClick={toggleCategoryModal}></div>
        <div className="modal-content box">
          <div className="title mb-1">This is a DESTRUCTIVE ACT!</div>
          <div>Deleting a category will delete all assosiated articles</div>
          <div>This act cannot be undone</div>
          <div className="subtitle is-underlined">
            Are you sure you want to DELETE the following category:
          </div>

          {categoryModal && (
            <div className="title mt-3">
              Category Name: {selectedCategory.categoryName}
            </div>

            // <article className="media box">
            //   <figure className="media-left">
            //     <p className="image is-64x64 is-clipped">
            //       <img
            //         src={selectedArticle.picture_decoded}
            //         alt="article picture"
            //       />
            //     </p>
            //   </figure>

            //   <div className="media-content">
            //     <div className="content">
            //       <div className="title">{selectedArticle.title}</div>

            //       {selectedArticle.isActive ? (
            //         <div className="tag is-primary">Active</div>
            //       ) : (
            //         <div className="tag is-warning">Not Active</div>
            //       )}
            //       <div className="tag">{selectedArticle.category}</div>

            //       <div className="subtitle">{selectedArticle.author}</div>
            //     </div>
            //   </div>
            // </article>
          )}

          <div className="buttons are-medium">
            <button
              className="button is-danger"
              onClick={deleteCategory} //delete
            >
              <span>Delete</span>
            </button>
            <button
              className="button is-dark"
              onClick={toggleCategoryModal} //cancel delete
            >
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>

      <div className="section is-small">
        <div className="container">
          <div className={categoryDropdown ? "dropdown is-active" : "dropdown"}>
            <div className="dropdown-trigger">
              <button
                className="button is-link"
                onClick={toggleCategoryDropdown}
              >
                <span>Categories</span>
                <span className="icon">
                  <i
                    className={
                      categoryDropdown ? "fas fa-angle-up" : "fas fa-angle-down"
                    }
                  ></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu">
              <div className="dropdown-content">
                {/* categoryName: category.name, */}
                {/* categorySynopsis: category.synopsis, */}
                {/* categoryId: category._id, */}

                {allCategories.map((category) => {
                  return (
                    <article
                      key={category.categoryId}
                      className="dropdown-item has-text-weight-bold is-underlined my-5"
                    >
                      {category.categoryName}
                      <span>
                        <div className="buttons">
                          <button
                            className="button is-link"
                            id={category.categoryId}
                            onClick={startCategoryEdit}
                          >
                            <span className="icon" id={category.categoryId}>
                              <i
                                className="fas fa-pencil"
                                id={category.categoryId}
                              ></i>
                            </span>
                          </button>

                          <button
                            className="button is-danger"
                            id={category.categoryId}
                            onClick={toggleCategoryModal}
                          >
                            <span className="icon" id={category.categoryId}>
                              <i
                                className="fas fa-trash"
                                id={category.categoryId}
                              ></i>
                            </span>
                          </button>
                        </div>
                      </span>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

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
                        id={article.articleId}
                        onClick={startArticleEdit} //edit post
                      >
                        <span className="icon" id={article.articleId}>
                          <i
                            className="fas fa-pencil"
                            id={article.articleId}
                          ></i>
                        </span>
                        <span id={article.articleId}>Edit</span>
                      </button>

                      <button
                        className="button is-danger"
                        id={article.articleId}
                        onClick={toggleModal} //toggle delete modal
                      >
                        <span className="icon" id={article.articleId}>
                          <i
                            className="fas fa-trash"
                            id={article.articleId}
                          ></i>
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
  updateCategoryToEdit: PropTypes.any.isRequired,
};