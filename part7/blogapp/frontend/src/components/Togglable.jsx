import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from 'react-bootstrap'


const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button className="mb-3" onClick={toggleVisibility}>{props.showButtonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button className="mb-3" onClick={toggleVisibility}>{props.hideButtonLabel}</Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  showButtonLabel: PropTypes.string.isRequired,
  hideButtonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
