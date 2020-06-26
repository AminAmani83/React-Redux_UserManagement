import React, { useEffect } from "react";
import AddressList from "./AddressList";
import { connect } from "react-redux";
import {
  loadAddresses,
  deleteAddress,
} from "../../Redux/actions/addressActions";
import { loadUsers } from "../../Redux/actions/userActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const AddressesPage = (props) => {
  useEffect(() => {
    if (props.addresses.length == 0) {
      props.loadAddresses();
    }
    if (props.users.length == 0) {
      props.loadUsers();
    }
  }, []);

  const handleAddAddressClick = (e) => {
    e.preventDefault();
    props.history.push("/address");
  };

  const handleDeleteAddressClick = (e) => {
    if (addressBelongsToAUser(e.target.name)) {
      toast.error("Cannot Delete an Address that Belongs to a User");
    } else {
      props.deleteAddress(e.target.name);
      toast.success("Address Deleted Successfully");
    }
  };

  const addressBelongsToAUser = (addressId) => {
    return props.users.find((u) => u.addressId === addressId);
  };

  return (
    <>
      <div className="jumbotron">
        <h1>Manage Addresses</h1>
      </div>

      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <div className="page-main-content">
            <h2 className="mt-3">Address List</h2>

            <AddressList
              addresses={props.addresses}
              handleDeleteAddressClick={handleDeleteAddressClick}
              handleAddAddressClick={handleAddAddressClick}
            />

            <div className="mt-3">
              Number of Addresses: {props.addresses.length}
            </div>
          </div>
        </>
      )}
    </>
  );
};

AddressesPage.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadAddresses: PropTypes.func.isRequired,
  deleteAddress: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    addresses: state.addresses,
    users: state.users,
    loading: state.pendingApiCallsCount > 0, // number of ongoing API calls
  };
};

const mapDispatchToProps = {
  loadAddresses,
  deleteAddress,
  loadUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressesPage);
