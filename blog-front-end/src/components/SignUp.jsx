//eslint-disable-next-line
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    bio: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const formRef = useRef(null);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

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
        "https://blog-api-production-f2ce.up.railway.app/blog/sign_up",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        navigate("/login");
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
      <div className="section title">Sign Up</div>

      <section className="section">
        <form
          ref={formRef}
          onSubmit={handleFormSubmit}
          method="POST"
          action="https://blog-api-production-f2ce.up.railway.app/blog/sign_up"
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
                  value={formData.bio || ""}
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
              Username, case sensitive:
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
              Password, case sensitive:
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
              <Link to="/" className="button is-dark is-medium">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
export default SignUp;
