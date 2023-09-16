//eslint-disable-next-line
import { useState, useEffect } from "react";
// import PropTypes from "prop-types"; // Import PropTypes
import logoSVG from "../assets/logo.svg";
import {Link, useLocation} from "react-router-dom";

export default function Nav() {
  const [navBarIsActive, setNavBarIsActive] = useState(false);
  const location= useLocation();

  function toggleNavBarIsActive() {
    setNavBarIsActive(!navBarIsActive);
  }

  const logoStyle = {
    maxWidth: "200px",
    maxHeight: "200px",
  };

  return (
    <>
      <nav className="navbar is-white is-spaced" aria-label="main-navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img src={logoSVG} style={logoStyle} />
          </Link>

          <a
            role="button"
            className={
              navBarIsActive ? "navbar-burger is-active" : "navbar-burger"
            }
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={toggleNavBarIsActive}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          className={navBarIsActive ? "navbar-menu is-active" : "navbar-menu"}
        >
          <div className="navbar-start">
            <Link to="/" className={location.pathname ==="/" ? "navbar-item is-active is-tab" : "navbar-item"}>Home</Link>
            <Link to="/aboutUs" className={location.pathname ==="/aboutUs" ? "navbar-item is-active is-tab" : "navbar-item"}>About Us</Link>
            {/* <a className="navbar-item">Contacts</a> */}

            {/* <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>
              <div className="navbar-dropdown">
                <a className="navbar-item">Link1</a>
                <a className="navbar-item">Link2</a>
                <a className="navbar-item">Link3</a>
                <hr className="navbar-divider" />
                <a className="navbar-item">Report an issue</a>
              </div>
            </div> */}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons are-medium">
                <Link to="/signUp" className="button is-primary">Sign up</Link>
                <Link to="/login" className="button is-light">Log in</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

// Define PropTypes for the prop
Nav.propTypes = {
  //   title: PropTypes.string.isRequired,
  //   subtitle: PropTypes.string.isRequired,
};
