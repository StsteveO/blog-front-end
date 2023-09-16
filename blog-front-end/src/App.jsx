//eslint-disable-next-line
import { useState, useEffect } from 'react'
import './App.css'
import "bulma/css/bulma.min.css";
import Hero from './components/Hero';
import Nav from './components/Nav';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS

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

  const websiteTitle= "Welcome to blogDev";
  const websiteSubtitle= "The blog for developers"

  return (
    <>
      <Nav />
      <Hero title={websiteTitle} subtitle={websiteSubtitle} />
    </>
  );
}

export default App
