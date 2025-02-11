import PropTypes from "prop-types";

const ErrorMessage = ({ message }) => {
  console.log("ErrorMessage component received:", message);

  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export { ErrorMessage };
