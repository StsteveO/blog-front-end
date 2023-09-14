//eslint-disable-next-line
import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes

export default function Hero({ title, subtitle }) {
  return (
    <>
      <section className="hero is-primary is-small-with-navbar">
        <div className="hero-body">
          <p className="title">{title}</p>
          <p className="subtitle">{subtitle}</p>
        </div>
      </section>
    </>
  );
}

// Define PropTypes for the 'title' prop
Hero.propTypes = {
  title: PropTypes.string.isRequired, // Adjust the type and validation as needed
  subtitle: PropTypes.string.isRequired,
};