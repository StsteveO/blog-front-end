//eslint-disable-next-line
import { useState, useEffect } from "react";
// import PropTypes from "prop-types"; // Import PropTypes

export default function Nav() {
  return (
    <>
      <nav className="navbar" aria-label="main-navigation">
        <div className="navbar-brand">
          <a className="navbar-item">
            <img src="https://bulma.io/images/bulma-logo.png" />
          </a>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">Home</a>
            <a className="navbar-item">Bio</a>
            <a className="navbar-item">Contacts</a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>
              <div className="navbar-dropdown">
                <a className="navbar-item">Link1</a>
                <a className="navbar-item">Link2</a>
                <a className="navbar-item">Link3</a>
                <hr className="navbar-divider" />
                <a className="navbar-item">Report an issue</a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">Sign up</a>
                <a className="button is-light">Log in</a>
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
