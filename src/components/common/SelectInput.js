import React from "react";
import PropTypes, { object } from "prop-types";

const SelectInput = ({
  name,
  label,
  addressId,
  options,
  defaultSelectedText,
  disabled,
  handleFieldChange,
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select
        value={addressId || ""}
        className="form-control"
        onChange={handleFieldChange}
        disabled={disabled}
        name={name}
        id={name}
      >
        <option value={null}>{defaultSelectedText}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.text}
          </option>
        ))}
      </select>
    </>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(object).isRequired,
  defaultSelectedText: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  addressId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default SelectInput;
