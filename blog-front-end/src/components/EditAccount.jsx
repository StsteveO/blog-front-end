//eslint-disable-next-line
import { useState, useEffect } from "react";
//eslint-disable-next-line
import { Link, useNavigate } from "react-router-dom";
//eslint-disable-next-line
import React, { useRef } from "react";
//eslint-disable-next-line
import PropTypes from "prop-types";

const EditAccount = () => {
  //eslint-disable-next-line
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  //eslint-disable-next-line
  const userId = localStorage.getItem("userId");
  //eslint-disable-next-line
  const [accountInfo, setAccountInfo] = useState();
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const formRef = useRef(null);
  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    bio: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  useEffect(() => {
    fetch("http://blog-api-production-f2ce.up.railway.app/account_edit", {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        setAccountInfo(data[0]);
        setFormData({
          firstName: data[0].first_name,
          bio: data[0].bio,
          username: data[0].username,
          password: "",
          passwordConfirmation: "",
          userId: data[0]._id,
        });
      });
  }, []);

  //   exp: 1698029654;
  //   firstName: "pilot";
  //   iat: 1698018854;
  //   userId: "6507b150d60785f8a8121187";
  //   username: "user";

  //   console.log(formData)

  const handleFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (formData.password === formData.passwordConfirmation) {
      setPasswordsMatch(true);
      //formRef.current.submit(); //submits the form
      const response = await fetch(
        "http://blog-api-production-f2ce.up.railway.app/account_update",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: headers,
        }
      );

      if (response.status === 200) {
        navigate("/userDashboard");
      } else if (response.status === 400) {
        let responseData = await response.json();
        setErrors(responseData.errors);
      } else if (response.status === 500) {
        let responseData = await response.json();
        setErrors(responseData.errors);
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <>
      <div className="section title">Edit Account</div>

      <section className="section">
        <form
          ref={formRef}
          onSubmit={handleFormSubmit}
          method="POST"
          action="http://blog-api-production-f2ce.up.railway.app/account_update"
        >
          <div className="field">
            <label className="label">
              {" "}
              First Name:
              <div className="control has-icons-left">
                <input
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleFormChange}
                  className="input is-medium"
                  type="text"
                  placeholder="First Name"
                  required
                />
                <span className="icon is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </label>
          </div>

          <div className="field">
            <label className="label">
              {" "}
              Tell us a little about yourself:
              <div className="control has-icons-left">
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleFormChange}
                  className="textarea is-medium has-fixed-size"
                  type="textarea"
                  placeholder="Bio"
                  rows="5"
                  required
                />
                {/* <span className="icon is-left">
                  <i className="fas fa-user"></i>
                </span> */}
              </div>
            </label>
          </div>

          <div className="field">
            <label className="label">
              {" "}
              Username:
              <div className="control has-icons-left">
                <input
                  name="username"
                  value={formData.username || ""}
                  onChange={handleFormChange}
                  className="input is-medium"
                  type="text"
                  placeholder="Username"
                  required
                />
                <span className="icon is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </label>
          </div>

          <div className="field">
            <label className="label">
              {" "}
              Password:
              <div className="control has-icons-left">
                <input
                  name="password"
                  value={formData.password || ""}
                  onChange={handleFormChange}
                  className="input is-medium"
                  type="password"
                  placeholder="Password"
                  required
                />
                <span className="icon is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </label>
          </div>

          <div className="field">
            <label className="label">
              {" "}
              Confirm Password:
              <div className="control has-icons-left">
                <input
                  name="passwordConfirmation"
                  value={formData.passwordConfirmation || ""}
                  onChange={handleFormChange}
                  className={
                    passwordsMatch
                      ? "input is-medium"
                      : "input is-medium is-danger"
                  } //"input is-medium"
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
                <span className="icon is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </label>
          </div>

          {!passwordsMatch && (
            <p className="notification is-danger is-size-4">
              Passwords do not match.
            </p>
          )}
          {errors.length > 0 && (
            <div className="notification is-danger is-size-4">
              <p>Validation Errors</p>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error.msg}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary is-medium">Submit</button>
            </div>
            <div className="control">
              <Link to="/userDashboard" className="button is-dark is-medium">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
export default EditAccount;
