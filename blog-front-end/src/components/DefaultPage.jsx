// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const DefaultPage = ({
  clientArticles,
  singlePickedArticle,
  singlePickedCategory,
}) => {
  console.log(clientArticles);

  return (
    <>
      <div className="section is-medium pt-4">
        <div className="title">blogPosts</div>
        <div className="container">
          <div className="columns is-flex-wrap-wrap">
            {clientArticles.map((article) => {
              return (
                <div key={article.articleId} className="column is-6">
                  <div className="card mb-6">
                    <div className="card-image">
                      <figure className="image">
                        <img src={article.picture_decoded} />
                      </figure>
                    </div>
                    <div className="card-content content mb-0">
                      <div className="title mb-2">
                        {article.title}{" "}
                        <span
                          id={article.categoryId}
                          onClick={singlePickedCategory}
                          className="tag is-info is-clickable"
                        >
                          {article.category}
                        </span>
                      </div>
                      <div className="sub-title mb-5">{article.author}</div>
                      <blockquote>{article.preview}</blockquote>
                    </div>
                    <div className="card-footer">
                      <div
                        className="card-footer-item button is-large is-link"
                        onClick={singlePickedArticle}
                        id={article.articleId}
                      >
                        Read post
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default DefaultPage;

DefaultPage.propTypes = {
  clientArticles: PropTypes.any.isRequired,
  singlePickedArticle: PropTypes.any.isRequired,
  singlePickedCategory: PropTypes.any.isRequired,
};