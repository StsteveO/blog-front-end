//eslint-disable-next-line
import { useState, useEffect } from 'react'
import './App.css'
import "bulma/css/bulma.min.css";
import Hero from './components/Hero';
import Nav from './components/Nav';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS
import DefaultPage from './components/DefaultPage';
import AboutUs from './components/AboutUs';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { useParams } from 'react-router-dom';

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

  const { name }= useParams();

  const websiteTitle= "Welcome to blogDev";
  const websiteSubtitle= "The blog for developers"

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
        ) : (
          <DefaultPage />
        )}
      </div>
    </>
  );
}

export default App
