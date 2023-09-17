//eslint-disable-next-line
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [passwordsMatch, setPasswordsMatch]= useState(true);
  const formRef= useRef(null);

  const handleFormChange= (event) =>{
    const name= event.target.name;
    const value= event.target.value;
    setFormData(values => ({...values, [name]: value}));
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if(formData.password === formData.passwordConfirmation){
      console.log(formData);
      setPasswordsMatch(true);
      //formRef.current.submit(); //submits the form
    }else{
      setPasswordsMatch(false);
    }
  };

  return (
    <>
      <h1 className="section title"> Sign Up</h1>

      <section className="section">
        <form ref={formRef} onSubmit={handleFormSubmit} method="POST" action="http://localhost:3000/blog/sign_up">
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
                  className={passwordsMatch ? "input is-medium" : "input is-medium is-danger"} //"input is-medium"
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

          {!passwordsMatch && (<p className="notification is-danger is-size-4">Passwords do not match.</p>)}

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
