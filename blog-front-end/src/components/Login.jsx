//eslint-disable-next-line
import { useState, useEffect } from "react";
//eslint-disable-next-line
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  //eslint-disable-next-line
  const navigate = useNavigate();
  //eslint-disable-next-line
  const [errors, setErrors] = useState([]);
  //eslint-disable-next-line
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };
  //eslint-disable-next-line
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    //eslint-disable-next-line
    const response = await fetch(
      "https://blog-api-production-f2ce.up.railway.app/blog/login",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const responseData = await response.json();
      const token = responseData.token;
      localStorage.setItem("authToken", token);
      // localStorage.setItem("userId", responseData.userId);
      navigate("/userDashboard");
    } else if (response.status === 400) {
      let responseData = await response.json();
      setErrors([responseData.errors]);
    } else if (response.status === 401) {
      let responseData = await response.json();
      setErrors([responseData.errors]);
    } else if (response.status === 500) {
      let responseData = await response.json();
      setErrors([responseData.errors]);
    }
  };

  return (
    <>
      <div className="section title">Login</div>

      <section className="section">
        <form onSubmit={handleFormSubmit}>
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
export default Login;
