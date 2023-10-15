import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div className="section is-medium">
        <div className="container">
          <div className="title">An error has occured !</div>
          <div className="subtitle">Please click the link to return to the homepage and try again.</div>
          <Link to="/">Click here to go back home.</Link>
        </div>
      </div>
    </>
  );
};
export default ErrorPage;
