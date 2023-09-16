import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <h1> This is an Error page.</h1>
      <Link to="/">Click here to go back home.</Link>
    </>
  );
};
export default ErrorPage;
