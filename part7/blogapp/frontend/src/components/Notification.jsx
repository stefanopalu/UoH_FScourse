import PropTypes from "prop-types";
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification === null) {
    return null;
  }

  return <div className="notification">{notification}</div>;
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export { Notification };
