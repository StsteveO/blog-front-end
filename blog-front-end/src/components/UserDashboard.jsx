//eslint-disable-next-line
import { useState, useEffect } from "react";
//eslint-disable-next-line
import { Link, useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [userArticles, setUserArticles] = useState([]);
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

  return (
    <>
      {console.log(userArticles)}
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
                        onClick={""}//edit post
                      >
                        <span className="icon">
                          <i className="fas fa-pencil"></i>
                        </span>
                        <span>Edit</span>
                      </button>

                      <button
                        className="button is-danger"
                        onClick={""}//delete
                      >
                        <span className="icon">
                          <i className="fas fa-trash"></i>
                        </span>
                        <span>Delete</span>
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
