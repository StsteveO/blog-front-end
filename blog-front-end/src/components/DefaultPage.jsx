// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const DefaultPage = ({ clientArticles, singlePickedArticle }) => {
  // const navigate = useNavigate();

  // function decodeHTMLString(encodedHTMLString){
  //   let parser = new DOMParser();
  //   let dom = parser.parseFromString('<!doctype html><body>' + encodedHTMLString, 'text/html');
  //   return dom.body.textContent;
  // }

  // const [clientArticles, setClientArticles]= useState([]);
  // const [article, setArticle]= useState();

  // useEffect(()=>{
  //   fetch("http://localhost:3000/blog/articles_client")
  //   .then((response)=>response.json())
  //   .then ((data)=>{
  //     const clientArticlesData= data.map((article)=>{
  //       return {
  //         articleId: article._id,
  //         title: article.title,
  //         preview: decodeHTMLString(article.preview),
  //         category: article.category.name,
  //         categoryId: article.category._id,
  //         author: article.author.first_name,
  //         authorId: article.author._id,
  //         picture_decoded: decodeHTMLString(article.article_picture),
  //       };
  //     })
  //     setClientArticles(clientArticlesData);
  //   })
  // }, []);

  // function singlePickedArticle(event){
  //   let singleArticle= clientArticles.filter((article)=>{
  //     return article.articleId=== event.target.id
  //   });
  //   setArticle(singleArticle[0]);
  //   // navigate("/singleArtical");
  // }

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
                        <span className="tag is-info">{article.category}</span>
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
};