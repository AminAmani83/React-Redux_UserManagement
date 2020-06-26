import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUsers, saveUser } from "../../Redux/actions/userActions";
import { loadAddresses } from "../../Redux/actions/addressActions";
import UserForm from "./UserForm";
import { newUser } from "../../../tools/mockData"; // used in mapStateToProps (Not in useState directly)
import { toast } from "react-toastify";
import { Prompt } from "react-router-dom";

const ManageUsers = ({ saveUser, ...props }) => {
  // this is how to destructure only one element and keep the rest in props
  const [userToSave, setUserToSave] = useState({ ...props.newUser });
  const [validationErrors, setValidationErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [shouldBlockNavigation, setShouldBlockNavigation] = useState(false);

  useEffect(() => {
    if (props.users.length === 0) {
      props.loadUsers().catch((err) => {
        alert("Error Loading Users, " + err);
      });
    }

    if (props.addresses.length === 0) {
      props.loadAddresses().catch((err) => {
        alert("Error Loading User Addresses, " + err);
      });
    }
  }, []);

  useEffect(() => {
    if (props.match.params.id && props.users.length > 0) {
      // 1. from API:
      // userApi.getUserById(props.match.params.id).then(setUserToSave);
      // 2. From Redux Store
      const u = getUserByIdFromStore(props.match.params.id);
      if (!u) props.history.push("/page-not-found");
      setUserToSave({ ...u });
    }
  }, [props.users]);

  const userInputIsValid = () => {
    const errors = {};

    if (!userToSave.name) {
      errors.name = "Name is Required.";
    }
    if (!userToSave.age) {
      errors.age = "Age is Required.";
    }
    if (!userToSave.addressId) {
      errors.addressId = "Address is Required.";
    }

    setValidationErrors(errors);
    // the above action is async and would not be reflected right away,
    // so we can't check if the validationErrors state is empty or not, just yet.
    // we will base our decision on the local errors variable.
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShouldBlockNavigation(false);
    if (!userInputIsValid()) return;
    setIsSaving(true);
    saveUser(userToSave)
      .then(() => {
        toast.success("User Saved Successfully.");
        props.history.push("/users");
      })
      .catch((error) => {
        toast.error("User Not Saved: " + error.message);
        setIsSaving(false);
      });
  };

  const handleFieldChange = (e) => {
    setShouldBlockNavigation(true);
    // e.persist(); // This way "e" won't be nullified by React & we can use e.target.value inside the async setCourse function below:
    // but the following method (option 2) has better performance, because we allow for "e" to be reused, and only save name and value for later use:
    const { name, value } = e.target;

    // add user to state
    let val;
    if (name === "age") {
      val = parseInt(value) || null; // this method does not allow zero, 0 & NaN are replaced with null
      // val = isNaN(val) ? null : val; // this method allows for zero, only NaN is replaced with null
    } else {
      val = value;
    }
    setUserToSave((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const getUserByIdFromStore = (userId) => {
    return props.users.find((u) => u.id === userId) || null;
  };

  return (
    <>
      <Prompt
        when={shouldBlockNavigation}
        message="You have unsaved changes, are you sure you want to leave?"
      />

      <div className="jumbotron">
        <h1>Manage Users</h1>
      </div>

      <div className="page-main-content">
        <h2>{props.match.params.id ? "Edit" : "Add"} a User</h2>
        <UserForm
          handleSubmit={handleSubmit}
          handleFieldChange={handleFieldChange}
          user={userToSave}
          validationErrors={validationErrors}
          addresses={props.addresses}
          isSaving={isSaving}
          isLoading={props.addresses.length == 0 || props.users.length == 0}
          preloadFields={props.match.params.id ? true : false}
        />
      </div>
    </>
  );
};

ManageUsers.propTypes = {
  newUser: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  addresses: PropTypes.array.isRequired,
  saveUser: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
  loadAddresses: PropTypes.func.isRequired,
  match: PropTypes.object,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    newUser: newUser,
    users: state.users,
    addresses: state.addresses,
  };
};

// const mapDispatchToProps = {
//   // Method 2
//   createUser: userActions.createUser,
//   loadUsers: userActions.loadUsers,
//   loadAddresses: addressActions.loadAddresses,
// };

// Tweak for shortest version after updating the import up top:
const mapDispatchToProps = {
  // Method 2
  saveUser,
  loadUsers,
  loadAddresses,
};
// note: up top we have these same names as imports.
// how does react know whether it should use those imported functions or these props? props take precedence.

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
