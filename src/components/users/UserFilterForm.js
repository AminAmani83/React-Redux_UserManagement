import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const UserFilterForm = ({
  handleSubmit,
  handleFieldChange,
  handleClose,
  handleReset,
  user,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col-2 offset-1">
            <div className="form-group">
              <TextInput
                label=""
                placeholder="Name"
                name="name"
                value={user.name}
                disabled={false}
                handleFieldChange={handleFieldChange}
              />
            </div>
          </div>

          <div className="col-2">
            <div className="form-group">
              <TextInput
                label=""
                placeholder="Age"
                name="age"
                value={user.age}
                disabled={false}
                handleFieldChange={handleFieldChange}
              />
            </div>
          </div>

          <div className="col-2">
            <div className="form-group">
              <TextInput
                label=""
                placeholder="Province"
                name="province"
                value={user.province}
                disabled={false}
                handleFieldChange={handleFieldChange}
              />
            </div>
          </div>

          <div className="col-2">
            <div className="form-group">
              <TextInput
                label=""
                placeholder="City"
                name="city"
                value={user.city}
                disabled={false}
                handleFieldChange={handleFieldChange}
              />
            </div>
          </div>

          <div className="col-2">
            <div className="form-group">
              <TextInput
                label=""
                placeholder="Street"
                name="street"
                value={user.street}
                disabled={false}
                handleFieldChange={handleFieldChange}
              />
            </div>
          </div>
        </div>
        <div className="form-row justify-content-center mb-3">
          <div className="col-2">
            <button type="submit" className="btn btn-info form-control">
              Search
            </button>
          </div>
          <div className="col-2">
            <button
              onClick={handleReset}
              className="btn btn-warning form-control"
            >
              Reset
            </button>
          </div>
          <div className="col-2">
            <button
              onClick={handleClose}
              className="btn btn-danger form-control"
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

UserFilterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserFilterForm;
