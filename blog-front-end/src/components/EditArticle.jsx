//eslint-disable-next-line
import { useState, useEffect } from "react";
//eslint-disable-next-line
import { Link, useNavigate } from "react-router-dom";
//eslint-disable-next-line
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
const tinyMCEApiKey = import.meta.env.VITE_TinyMCE_apiKey;
import PropTypes from "prop-types";

const EditArticle = ({ articleToEdit }) => {
  // console.log("article to edit");
  // console.log(articleToEdit);
  //   articleId: "6513863b29028d06e37eecdb"
  // article_body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacinia quis vel eros donec ac. Leo a diam sollicitudin tempor id eu nisl. Arcu cursus euismod quis viverra nibh cras pulvinar. Neque egestas congue quisque egestas diam. Eget duis at tellus at urna condimentum mattis pellentesque id. Egestas erat imperdiet sed euismod nisi porta lorem. Porta nibh venenatis cras sed felis eget velit. Senectus et netus et malesuada fames ac turpis egestas integer. Nec ultrices dui sapien eget. Velit egestas dui id ornare arcu odio. Nibh praesent tristique magna sit. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum lectus. Morbi non arcu risus quis varius quam quisque id diam. Et molestie ac feugiat sed. Cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam. Mi ipsum faucibus vitae aliquet nec ullamcorper. Nisl pretium fusce id velit ut tortor pretium viverra suspendisse.\n\nVolutpat consequat mauris nunc congue nisi vitae suscipit tellus. Praesent tristique magna sit amet purus gravida quis. Eleifend mi in nulla posuere sollicitudin aliquam. Sed sed risus pretium quam vulputate dignissim suspendisse in est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Nisl rhoncus mattis rhoncus urna neque viverra. Arcu non sodales neque sodales ut etiam. Magnis dis parturient montes nascetur ridiculus mus. Duis convallis convallis tellus id. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Cum sociis natoque penatibus et magnis dis parturient montes nascetur. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis. Diam volutpat commodo sed egestas. Porttitor massa id neque aliquam. Risus viverra adipiscing at in tellus integer feugiat. Tristique senectus et netus et. Sagittis id consectetur purus ut faucibus pulvinar elementum. Massa vitae tortor condimentum lacinia quis vel eros donec.\n\nEnim praesent elementum facilisis leo vel fringilla est. Eu feugiat pretium nibh ipsum consequat. Quis risus sed vulputate odio ut enim blandit volutpat maecenas. Eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar. Egestas dui id ornare arcu. Sed faucibus turpis in eu. Netus et malesuada fames ac turpis. Fermentum odio eu feugiat pretium nibh. Lectus quam id leo in vitae turpis massa sed. Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. Ut tristique et egestas quis ipsum suspendisse. Sed egestas egestas fringilla phasellus faucibus. Habitant morbi tristique senectus et. Nunc sed augue lacus viverra. Vestibulum morbi blandit cursus risus at ultrices mi. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Tristique risus nec feugiat in. Donec ultrices tincidunt arcu non.\n\nDignissim cras tincidunt lobortis feugiat. Leo vel fringilla est ullamcorper eget nulla. Scelerisque in dictum non consectetur a erat nam at lectus. Bibendum neque egestas congue quisque egestas diam in arcu. Dignissim enim sit amet venenatis urna cursus eget. Lacinia at quis risus sed vulputate odio. Purus sit amet volutpat consequat mauris nunc congue nisi vitae. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Platea dictumst quisque sagittis purus sit amet volutpat. Magna sit amet purus gravida quis blandit turpis cursus. Magna etiam tempor orci eu lobortis elementum. Semper feugiat nibh sed pulvinar proin. Et sollicitudin ac orci phasellus egestas. Id ornare arcu odio ut sem nulla pharetra. Semper risus in hendrerit gravida rutrum quisque. Lacus sed viverra tellus in hac. Quisque sagittis purus sit amet volutpat consequat mauris nunc. In arcu cursus euismod quis viverra nibh cras pulvinar mattis.\n\nSed vulputate mi sit amet mauris commodo quis. Sit amet est placerat in. Pellentesque habitant morbi tristique senectus et netus et. Tincidunt vitae semper quis lectus nulla at. Ante metus dictum at tempor commodo ullamcorper. In arcu cursus euismod quis viverra nibh cras pulvinar. Lectus magna fringilla urna porttitor. Arcu cursus vitae congue mauris rhoncus aenean. Volutpat sed cras ornare arcu dui vivamus arcu felis. Sit amet risus nullam eget felis eget nunc. Mauris augue neque gravida in fermentum et sollicitudin. Fringilla ut morbi tincidunt augue interdum velit. Dapibus ultrices in iaculis nunc sed. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus. Consequat nisl vel pretium lectus quam id."
  // author: "pilot"
  // authorId: "6507b150d60785f8a8121187"
  // category: "Motivation"
  // categoryId: "650cebbaa651ecd9f9bdf498"
  // isActive: false
  // picture_credit: "Ales Nesetril on Upsplash"
  // picture_decoded: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1420&q=80"
  // preview: "...you know, the one that broke the camels back. What drove me to tech."
  // title: "The Straw"
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
    title: articleToEdit.title,
    articleId: articleToEdit.articleId,
    author: "",
    category: false, //articleToEdit.category,
    article_picture: articleToEdit.picture_decoded,
    picture_credit: articleToEdit.picture_credit,
    preview: articleToEdit.preview,
    article_body: articleToEdit.article_body,
    article_is_active: articleToEdit.isActive,
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
          "http://blog-api-production-f2ce.up.railway.app/blog/article_list",
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
          "http://blog-api-production-f2ce.up.railway.app/blog/category_list",
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
    console.log(formData);
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
        "http://blog-api-production-f2ce.up.railway.app/blog/article_update",
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
      <div className="section title">Edit Artical</div>

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
                    value={formData.category || articleToEdit.categoryId}
                    onChange={handleCategorySelectFormChange}
                  >
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
              initialValue={articleToEdit.article_body}
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
                  defaultChecked={formData.article_is_active === true}
                />
                Active Artical
              </label>

              <label className="radio">
                <input
                  name="article_is_active"
                  value={formData.article_is_active || false}
                  onClick={handleFormRadioChangeFalse}
                  type="radio"
                  defaultChecked={formData.article_is_active === false}
                  required
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
                  <li key={index}>{error}</li>
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
export default EditArticle;

EditArticle.propTypes = {
  articleToEdit: PropTypes.any.isRequired,
};
