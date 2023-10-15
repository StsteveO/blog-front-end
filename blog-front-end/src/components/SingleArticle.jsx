import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const SingleArtical = ({ article }) => {
  const navigate = useNavigate();

  function handleHomeBtn() {
    navigate("/");
  }

  return (
    <>
      <div className="section is-medium pt-4">
        <div className="container">
          <div className="content">
            <button
              className="button is-link is-small mb-2"
              onClick={handleHomeBtn}
            >
              <span className="icon">
                <i className="fas fa-home"></i>
              </span>
              <span>Home</span>
            </button>
            <figure className="image mb-0">
              <img src={article.picture_decoded} alt="Article picture" />
            </figure>
            <figcaption className="mb-5">
              Picture credit: {article.picture_credit}
            </figcaption>
            <div className="title">
              {article.title}{" "}
              <span className="tag is-info">{article.category}</span>
            </div>
            <div className="subtitle">{article.author}</div>
            <div className="" dangerouslySetInnerHTML={{ __html: article.article_body }} />

            <button
              className="button is-link is-small mt-6"
              onClick={handleHomeBtn}
            >
              <span className="icon">
                <i className="fas fa-home"></i>
              </span>
              <span>Home</span>
            </button>

          </div>
        </div>
      </div>
    </>
  );
};
export default SingleArtical;

SingleArtical.propTypes = {
  article: PropTypes.any.isRequired,
};

// articleId: "651de1424d239eda51acc240";
// author: "pilot";
// authorId: "6507b150d60785f8a8121187";
// category: "Motivation";
// categoryId: "650cebbaa651ecd9f9bdf498";
// picture_decoded: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
// preview: "preview 2";
// title: "title 2";
