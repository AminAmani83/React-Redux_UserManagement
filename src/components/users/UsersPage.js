import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as userActions from "../../Redux/actions/userActions";
import * as addressActions from "../../Redux/actions/addressActions";
import { PropTypes } from "prop-types";
import { bindActionCreators } from "redux";
import UserList from "./UserList";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { newUser } from "../../../tools/mockData"; // used in mapStateToProps

const UsersPage = (props) => {
  useEffect(() => {
    if (props.users.length === 0) {
      props.actions.userActions.loadUsers();
    }

    if (props.addresses.length === 0) {
      props.actions.loadAddresses();
    }
  }, []);

  const handleAddUserClick = () => {
    props.history.push("/user");
  };

  const handleDeleteUserClick = (e) => {
    // Confirmation
    let result = confirm("Are you sure?");
    if (!result) return;

    const userId = e.target.name;
    const addressId = findAddressId(userId);

    // Deleting the User
    props.actions.userActions
      .deleteUser(userId)
      .then(() => {
        deleteAddressIfOrphan(addressId, userId);
        toast.success("User Deleted Successfully");
      })
      .catch((err) => {
        toast.error("User Not Deleted: " + err.message);
      });
  };

  const findAddressId = (userId) => {
    const userToBeDeleted = props.users.find((u) => u.id === userId);
    return userToBeDeleted.addressId;
  };

  const deleteAddressIfOrphan = (addressId, userId) => {
    // Finding out whether this address is used by other users except by this userId
    const userWithSameAddressId = props.users.find(
      (u) => u.addressId === addressId && u.id !== userId
    );
    if (!userWithSameAddressId) {
      // address is not used by other users, delete it
      console.log("Deleting Orphan Address");
      props.actions.deleteAddress(addressId);
    }
  };

  // if (props.addresses.length == 0 || props.users.length == 0) {
  //   return <Spinner />;
  // }

  return (
    <>
      <div className="jumbotron">
        <h1>Manage Users</h1>
      </div>
      {props.loading ? (
        <Spinner />
      ) : (
        <div className="page-main-content">
          <h2 className="">User List</h2>
          <div>
            <UserList
              users={props.users}
              newUser={props.newUser}
              pagination={{ enabled: true, itemsPerPage: 10 }}
              enableFiltration={true}
              enableSorting={true}
              handleDeleteUserClick={handleDeleteUserClick}
              handleAddUserClick={handleAddUserClick}
            />
          </div>
        </div>
      )}
    </>
  );
};

UsersPage.propTypes = {
  users: PropTypes.array.isRequired,
  addresses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  newUser: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    users:
      state.addresses.length === 0
        ? []
        : [...state.users]
            .sort((u1, u2) => u1["name"].localeCompare(u2["name"]))
            .map((u) => ({
              // add address info to user objects
              ...u,
              province: state.addresses.find((adr) => adr.id === u.addressId)
                .province,
              city: state.addresses.find((adr) => adr.id === u.addressId).city,
              street: state.addresses.find((adr) => adr.id === u.addressId)
                .street,
            })),
    addresses: state.addresses,
    loading: state.pendingApiCallsCount > 0, // number of ongoing API calls
    newUser: { ...newUser, province: "", city: "", street: "" },
  };
};

// Method 1
const mapDispatchToProps = (dispatch) => {
  return {
    // createUser: (user) => dispatch(userActions.createUser(user)),
    actions: {
      // this does the above line automatically
      userActions: bindActionCreators(userActions, dispatch), // Generic: binds all action creators in userActions.js
      loadAddresses: bindActionCreators(addressActions.loadAddresses, dispatch), // Specific action creator binding
      deleteAddress: bindActionCreators(addressActions.deleteAddress, dispatch), // Specific action creator binding
    },
  };
};

// Method 2 (Shorter, using object, but you have to define all action creators)
// const mapDispatchToProps = {
//   createUser: userActions.createUser,
//   loadUsers: userActions.loadUsers,
//   loadAddresses: addressActions.loadAddresses,
// };

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
