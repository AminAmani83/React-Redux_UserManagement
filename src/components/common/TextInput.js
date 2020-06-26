import React from "react";
import PropTypes from "prop-types";

const TextInput = ({
  name,
  label,
  value,
  disabled,
  handleFieldChange,
  placeholder = "",
}) => {
  return (
    <>
      <label htmlFor={name} className="mr-2">
        {label}
      </label>
      <input
        type="text"
        className="form-control"
        name={name}
        id={name}
        value={value || ""}
        disabled={disabled}
        onChange={handleFieldChange}
        placeholder={placeholder}
      />
    </>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default TextInput;
