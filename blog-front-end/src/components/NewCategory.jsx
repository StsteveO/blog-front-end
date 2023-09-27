//eslint-disable-next-line
import { useState, useEffect } from "react";
//eslint-disable-next-line
import { Link, useNavigate } from "react-router-dom";

const NewCategory = () => {
  //eslint-disable-next-line
  const [categories, setCategories] = useState([]);
  //eslint-disable-next-line
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    categoryName: "",
    categorySynopsis: "",
  });
  //eslint-disable-next-line
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  //eslint-disable-next-line
  const userId = localStorage.getItem("userId");

  //eslint-disable-next-line
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  useEffect(() => {
    if (!authToken) {
      navigate("/login"); // Redirect to login page if authToken is missing
    }

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/blog/category_list", {
          method: "GET",
          headers: headers,
        });

        if (response.status === 200) {
          // console.log("Successfully fetched categories");
          const data = await response.json();
          setCategories(data);
          // console.log(categories);
        } else {
          // console.log("Failed to fetch categories");
          throw new Error("Failed to fetch categories");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    //eslint-disable-next-line
  }, []);

  const handleFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));

    // console.log(formData);
  };

  //eslint-disable-next-line
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    //eslint-disable-next-line
    try{
      const response = await fetch("http://localhost:3000/blog/category_create", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      navigate("/userDashboard");
    } else if (response.status === 400) {
      let responseData = await response.json();
      setErrors([responseData.errors]);
      // console.log(responseData);
    } else if (response.status === 401) {
      let responseData = await response.json();
      setErrors([responseData.errors]);
    } else if (response.status === 500) {
      let responseData = await response.json();
      setErrors([responseData.errors]);
    }
  }catch(error){
      console.error(error);
    }
  };

  return (
    <>
      <div className="section title">New Category</div>

      <section className="section">
        <form onSubmit={handleFormSubmit}>
          <div className="field">
            <label className="label">
              {" "}
              Category Name:
              <div className="control has-icons-left">
                <input
                  name="categoryName"
                  value={formData.categoryName || ""}
                  onChange={handleFormChange}
                  className="input is-medium"
                  type="text"
                  placeholder="New Category Name"
                  required
                />
                <span className="icon is-left">
                  <i className="fas fa-tag"></i>
                </span>
              </div>
            </label>
          </div>

          <div className="field">
            <label className="label">
              {" "}
              Synopsis:
              <div className="control has-icons-left">
                <input
                  name="categorySynopsis"
                  value={formData.categorySynopsis || ""}
                  onChange={handleFormChange}
                  className="input is-medium"
                  type="text"
                  placeholder="Brief explaination of category"
                  required
                />
                <span className="icon is-left">
                  <i className="fas fa-pen"></i>
                </span>
              </div>
            </label>
          </div>

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

      <section className="section">
        <div className="title">Categories</div>
        {categories && <ul>
          {categories.map((category) => (
            <li key={category._id}>{category.name}</li> //just the name, not the synopsis
          ))}
        </ul>}
      </section>
    </>
  );
};
export default NewCategory;