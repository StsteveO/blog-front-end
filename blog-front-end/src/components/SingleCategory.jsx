import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const SingleCategory = ({
  categoryTitle,
  singleCategoryList,
  singlePickedArticle,
  singlePickedCategory,
}) => {
  const navigate = useNavigate();

  function handleHomeBtn() {
    navigate("/");
  }

  return (
    <>
      <button className="button is-link is-small mb-5" onClick={handleHomeBtn}>
        <span className="icon">
          <i className="fas fa-home"></i>
        </span>
        <span>Home</span>
      </button>

      <div className="section is-medium pt-4">
        <div className="title">Category:{" "}{categoryTitle}</div>
        <div className="container">
          <div className="columns is-flex-wrap-wrap">
            {singleCategoryList.map((article) => {
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

      <button className="button is-link is-small mt-6" onClick={handleHomeBtn}>
        <span className="icon">
          <i className="fas fa-home"></i>
        </span>
        <span>Home</span>
      </button>
    </>
  );
};
export default SingleCategory;

SingleCategory.propTypes = {
  categoryTitle: PropTypes.any.isRequired,
  singleCategoryList: PropTypes.any.isRequired,
  singlePickedArticle: PropTypes.any.isRequired,
  singlePickedCategory: PropTypes.any.isRequired,
};

// articleId: "651de1424d239eda51acc240";
// author: "pilot";
// authorId: "6507b150d60785f8a8121187";
// category: "Motivation";
// categoryId: "650cebbaa651ecd9f9bdf498";
// picture_decoded: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
// preview: "preview 2";
// title: "title 2";
