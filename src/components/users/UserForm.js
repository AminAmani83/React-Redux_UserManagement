import React from "react";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import PropTypes from "prop-types";

const UserForm = ({
  handleSubmit,
  handleFieldChange,
  validationErrors,
  user,
  addresses,
  isSaving,
  isLoading,
  preloadFields,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className=" user-form">
        <div className="form-group">
          <TextInput
            label="Name:"
            name="name"
            value={preloadFields && isLoading ? "Loading..." : user.name}
            disabled={isSaving}
            handleFieldChange={handleFieldChange}
          />
          <div
            className={
              validationErrors.name
                ? "alert alert-danger input-field-error"
                : ""
            }
          >
            {validationErrors.name}
          </div>
        </div>

        <div className="form-group">
          <TextInput
            label="Age:"
            name="age"
            value={preloadFields && isLoading ? "Loading..." : user.age}
            disabled={isSaving}
            handleFieldChange={handleFieldChange}
          />
          <div
            className={
              validationErrors.age ? "alert alert-danger input-field-error" : ""
            }
          >
            {validationErrors.age}
          </div>
        </div>

        <div className="form-group">
          <SelectInput
            label="Address:"
            name="addressId"
            addressId={user.addressId}
            options={addresses.map((a) => ({
              value: a.id,
              text: `${a.province}, ${a.city}, ${a.street}`,
            }))}
            defaultSelectedText={
              addresses.length > 0 ? "Select an Address" : "Loading..."
            }
            disabled={isSaving}
            handleFieldChange={handleFieldChange}
          />
          <div
            className={
              validationErrors.addressId
                ? "alert alert-danger input-field-error"
                : ""
            }
          >
            {validationErrors.addressId}
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
  );
};

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  addresses: PropTypes.arrayOf(PropTypes.object).isRequired,
  isSaving: PropTypes.bool.isRequired,
  validationErrors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  preloadFields: PropTypes.bool.isRequired,
};

export default UserForm;
