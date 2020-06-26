import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const AddressForm = ({
  address,
  handleSubmit,
  handleFieldChange,
  validationErrors,
  isSaving,
  isLoading,
  preloadFields,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="address-form">
          <div className="form-group">
            <TextInput
              name="province"
              label="Province:"
              value={
                preloadFields && isLoading ? "Loading..." : address.province
              }
              disabled={isSaving}
              handleFieldChange={handleFieldChange}
            />
            <div
              className={
                validationErrors.province
                  ? "alert alert-danger input-field-error"
                  : ""
              }
            >
              {validationErrors.province}
            </div>
          </div>

          <div className="form-group">
            <TextInput
              name="city"
              label="City:"
              value={preloadFields && isLoading ? "Loading..." : address.city}
              disabled={isSaving}
              handleFieldChange={handleFieldChange}
            />
            <div
              className={
                validationErrors.city
                  ? "alert alert-danger input-field-error"
                  : ""
              }
            >
              {validationErrors.city}
            </div>
          </div>

          <div className="form-group">
            <TextInput
              name="street"
              label="Street:"
              value={preloadFields && isLoading ? "Loading..." : address.street}
              disabled={isSaving}
              handleFieldChange={handleFieldChange}
            />
            <div
              className={
                validationErrors.street
                  ? "alert alert-danger input-field-error"
                  : ""
              }
            >
              {validationErrors.street}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-info"
            disabled={isSaving}
            style={{ width: 100 }}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
};

AddressForm.propTypes = {
  address: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  validationErrors: PropTypes.object.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  preloadFields: PropTypes.bool.isRequired,
};

export default AddressForm;
