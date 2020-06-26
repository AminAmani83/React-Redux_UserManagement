import React from "react";
import PropTypes from "prop-types";

const ConditionalDisplay = (props) => {
  return <>{props.isVisible ? props.children : null}</>;
};

ConditionalDisplay.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default ConditionalDisplay;
