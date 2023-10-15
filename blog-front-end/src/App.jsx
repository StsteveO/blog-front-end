//eslint-disable-next-line
import { useState, useEffect } from "react";
import "./App.css";
import "bulma/css/bulma.min.css";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import FontAwesome CSS
import DefaultPage from "./components/DefaultPage";
import AboutUs from "./components/AboutUs";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import NewCategory from "./components/NewCategory";
import { useParams } from "react-router-dom";
import NewArtical from "./components/NewArtical";
import SingleArtical from "./components/SingleArticle";
import { useNavigate } from "react-router-dom";
import SingleCategory from "./components/SingleCategory";

// example
//<div className="icon-text">
//  <span className="icon">
//    <i className="fas fa-user"></i>
//  </span>
//  <span>User</span>
//</div>

function App() {
  //eslint-disable-next-line
  // const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const { name } = useParams();

  const websiteTitle = "Welcome to blogDev";
  const websiteSubtitle = "Another developer...another blog";

  function decodeHTMLString(encodedHTMLString) {
    let parser = new DOMParser();
    let dom = parser.parseFromString(
      "<!doctype html><body>" + encodedHTMLString,
      "text/html"
    );
    return dom.body.textContent;
  }

  // client
  const [clientArticles, setClientArticles] = useState([]);
  const [article, setArticle] = useState();
  const [categoryTitle, setCategoryTitle]= useState();
  const [singleCategoryList, setSingleCategoryList]= useState([]);
  // user

  useEffect(() => {
    fetch("http://localhost:3000/blog/articles_client")
      .then((response) => response.json())
      .then((data) => {
        const clientArticlesData = data.map((article) => {
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
          };
        });
        setClientArticles(clientArticlesData);
      });
  }, []);

  function singlePickedArticle(event) {
    let singleArticle = clientArticles.filter((article) => {
      return article.articleId === event.target.id;
    });
    setArticle(singleArticle[0]);
    navigate("/singleArtical");
  }

  function singlePickedCategory(event){
    let categoryName = event.target.innerText;
    let singleCategoryArticles= clientArticles.filter((article)=>{
      return article.categoryId=== event.target.id
    })
    setCategoryTitle(categoryName);
    setSingleCategoryList(singleCategoryArticles);
    navigate("/singlecategory");
  }

  return (
    <>
      <Nav />
      <Hero title={websiteTitle} subtitle={websiteSubtitle} />

      <div>
        {name === "aboutUs" ? (
          <AboutUs />
        ) : name === "signUp" ? (
          <SignUp />
        ) : name === "login" ? (
          <Login />
        ) : name === "userDashboard" ? (
          <UserDashboard />
        ) : name === "newCategory" ? (
          <NewCategory />
        ) : name === "newArtical" ? (
          <NewArtical />
        ) : name === "singleArtical" ? (
          <SingleArtical
            article={article}
            singlePickedCategory={singlePickedCategory}
          />
        ) : name === "singlecategory" ? (
          <SingleCategory
            categoryTitle={categoryTitle}
            singleCategoryList={singleCategoryList}
            singlePickedArticle={singlePickedArticle}
            singlePickedCategory={singlePickedCategory}
          />
        ) : (
          <DefaultPage
            clientArticles={clientArticles}
            singlePickedArticle={singlePickedArticle}
            singlePickedCategory={singlePickedCategory}
          />
        )}
      </div>
    </>
  );
}

export default App;
