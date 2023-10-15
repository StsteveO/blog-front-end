//eslint-disable-next-line
import { useState, useEffect } from "react";
//eslint-disable-next-line
import { Link, useNavigate } from "react-router-dom";

const UserDashboard = () => {
  //eslint-disable-next-line
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (!authToken) {
      navigate("/login"); // Redirect to login page if authToken is missing
    }
  }, [authToken, navigate]);

  // console.log(`authToken: ${authToken}`);
  //eslint-disable-next-line
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); //remove token from client storage
    localStorage.removeItem("userId"); //remove id from client storage
    navigate("/");
  };

  const handleNewCategory = () => {
    navigate("/newCategory");
  };

  const handleNewArtical = () => {
    navigate("/newArtical");
  };

  // Make a GET request with the token in the headers
  //example on how to get data
  //   fetch("http://localhost:3000/api/resource", {
  //     method: "GET",
  //     headers: headers,
  //   })
  //     .then((response) => {
  //       // Handle the response
  //     })
  //     .catch((error) => {
  //       // Handle errors
  //     });

  return (
    <>
      <section className="section">
        <div className="title">User Dashboard</div>

        <div className="buttons are-medium">
          
          <button className="button is-link" onClick={handleNewArtical}>
            <span className="icon">
              <i className="fas fa-plus"></i>
            </span>
            <span>New Blog Artical</span>
          </button>

          <button className="button is-link" onClick={handleNewCategory}>
            <span className="icon">
              <i className="fas fa-plus"></i>
            </span>
            <span>New Category</span>
          </button>

          <button className="button is-link" onClick={handleLogout}>
            <span className="icon">
              <i className="fas fa-right-from-bracket"></i>
            </span>
            <span>Log out</span>
          </button>
        </div>
      </section>

      <section className="section">
        <button className="button is-link is-medium" onClick={handleLogout}>
          <span className="icon">
            <i className="fas fa-right-from-bracket"></i>
          </span>
          <span>Log out</span>
        </button>
      </section>
    </>
  );
};
export default UserDashboard;
