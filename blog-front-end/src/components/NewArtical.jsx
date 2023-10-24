//eslint-disable-next-line
import { useState, useEffect } from "react";
//eslint-disable-next-line
import { Link, useNavigate } from "react-router-dom";
//eslint-disable-next-line
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
const tinyMCEApiKey = import.meta.env.VITE_TinyMCE_apiKey;

const NewArtical = () => {
  //eslint-disable-next-line
  const [errors, setErrors] = useState([]);
  //eslint-disable-next-line
  const [user, setUser] = useState({});
  //eslint-disable-next-line
  const [articles, setArticles] = useState([]);
  //eslint-disable-next-line
  const [categories, setCategories] = useState([]);
  //eslint-disable-next-line
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    article_picture: "",
    picture_credit: "",
    preview: "",
    article_body: "",
    article_is_active: false,
    authorId: "",
  });
  //eslint-disable-next-line
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  //eslint-disable-next-line
  const userId = localStorage.getItem("userId");

  // console.log(userId); is UNDIFINED

  //eslint-disable-next-line
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  useEffect(() => {
    if (!authToken) {
      navigate("/login"); // Redirect to login page if authToken is missing
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://blog-api-production-f2ce.up.railway.app/article_list",
          {
            method: "GET",
            headers: headers,
          }
        );

        if (response.status === 200) {
          // console.log("Successfully fetched user");
          const data = await response.json();
          setUser(data);
          setFormData((values) => ({ ...values, ["author"]: data.firstName }));
          setFormData((values) => ({ ...values, ["authorId"]: data.userId }));

          // console.log(categories);
        } else {
          console.log("Failed to fetch user");
          throw new Error("Failed to fetch user");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategoryListData = async () => {
      try {
        const response = await fetch(
          "http://blog-api-production-f2ce.up.railway.app/category_list",
          {
            method: "GET",
            headers: headers,
          }
        );

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

    fetchCategoryListData();
    fetchUserData();
    //eslint-disable-next-line
  }, []);

  // console.log(categories);

  //eslint-disable-next-line
  const handleFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
    // console.log(formData);
  };

  const handleFormRadioChangeFalse = (event) => {
    const name = event.target.name;
    const value = false;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleFormRadioChangeTrue = (event) => {
    const name = event.target.name;
    const value = true;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleCategorySelectFormChange = (event) => {
    const value = event.target.value;
    setFormData((values) => ({ ...values, ["category"]: value }));
  };

  //eslint-disable-next-line
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    //eslint-disable-next-line
    try {
      const response = await fetch(
        "http://blog-api-production-f2ce.up.railway.app/artical_create",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
    } catch (error) {
      console.error(error);
    }
  };

  const editorRef = useRef(null);
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

  function updateArticleBody() {
    console.log(editorRef.current.getContent());
    setFormData((values) => ({
      ...values,
      ["article_body"]: editorRef.current.getContent(),
    }));
  }

  return (
    <>
      <div className="section title">New Artical</div>

      <section className="section">
        <form onSubmit={handleFormSubmit}>
          <div className="field">
            <label className="label">
              {" "}
              Title:
              <div className="control has-icons-left">
                <input
                  name="title"
                  value={formData.title || ""}
                  onChange={handleFormChange}
                  className="input is-medium"
                  type="text"
                  placeholder="Artical Title"
                  required
                />
                <span className="icon is-left">
                  <i className="fas fa-newspaper"></i>
                </span>
              </div>
            </label>
          </div>

          <div className="field">
            <label className="label">
              {" "}
              Author:
              <div className="control has-icons-left">
                <input
                  name="author"
                  value={formData.author || ""}
                  onChange={handleFormChange}
                  className="input is-medium"
                  type="text"
                  placeholder="Artical Author"
                  required
                  readOnly
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
              Category:
              <div className="control has-icons-left">
                {/* <input
                  name="category"
                  value={formData.category || ""}
                  onChange={handleFormChange}
                  className="input is-medium"
                  type="text"
                  placeholder="Artical Category"
                  required
                /> */}
                <div className="select">
                  <select
                    value={formData.category || ""}
                    onChange={handleCategorySelectFormChange}
                  >
                    <option>Please pick a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <span className="icon is-left">
                  <i className="fas fa-tag"></i>
                </span>
              </div>
            </label>
          </div>

          <div className="field">
            <label className="label">
              {" "}
              Main Picture:
              <br />
              For best results, go to{" "}
              <a
                href="https://unsplash.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Unsplash.com.
              </a>{" "}
              Right click on any picture of your choice and select{" "}
              <em>Copy image address</em>. Paste the image address in the below
              field.
              <div className="control has-icons-left">
                <input
                  name="article_picture"
                  value={formData.article_picture || ""}
                  onChange={handleFormChange}
                  className="input is-medium"
                  type="text"
                  placeholder="Picture URL"
                  required
                />
                <span className="icon is-left">
                  <i className="fas fa-image"></i>
                </span>
              </div>
            </label>
          </div>

          <div className="field">
            <label className="label">
              {" "}
              Main Picture Credit:
              <div className="control has-icons-left">
                <input
                  name="picture_credit"
                  value={formData.picture_credit || ""}
                  onChange={handleFormChange}
                  className="input is-medium"
                  type="text"
                  placeholder="Name of Photographer"
                  required
                />
                <span className="icon is-left">
                  <i className="fas fa-id-card"></i>
                </span>
              </div>
            </label>
          </div>

          <div className="field">
            <label className="label">
              {" "}
              Artical Preview:
              <div className="control has-icons-left">
                <input
                  name="preview"
                  value={formData.preview || ""}
                  onChange={handleFormChange}
                  className="input is-medium"
                  type="text"
                  placeholder="Artical Preview"
                  required
                />
                <span className="icon is-left">
                  <i className="fas fa-eye"></i>
                </span>
              </div>
            </label>
          </div>

          <div className="field">
            <label className="label">
              {" "}
              Artical Body:
              {/* <div className="control has-icons-left">
                <textarea
                  name="article_body"
                  value={formData.article_body || ""}
                  onChange={handleFormChange}
                  className="textarea is-medium"
                  type="textarea"
                  placeholder="Artical Body"
                  rows="5"
                  required
                />
              </div> */}
            </label>
            <Editor
              apiKey={tinyMCEApiKey}
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue=""
              onEditorChange={updateArticleBody}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help | link | image | preview",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>

          <div className="field">
            <div className="control">
              <label className="radio">
                <input
                  name="article_is_active"
                  value={formData.article_is_active || true}
                  onClick={handleFormRadioChangeTrue}
                  type="radio"
                />
                Active Artical
              </label>

              <label className="radio">
                <input
                  name="article_is_active"
                  value={formData.article_is_active || false}
                  onClick={handleFormRadioChangeFalse}
                  type="radio"
                  required
                  defaultChecked
                />
                Inactive Artical (Archive)
              </label>
            </div>
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
export default NewArtical;
