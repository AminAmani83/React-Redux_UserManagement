import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AddressForm from "../addresses/AddressForm";
import { connect } from "react-redux";
import { loadAddresses, saveAddress } from "../../Redux/actions/addressActions";
import { newAddress } from "../../../tools/mockData"; // used in mapStateToProps (Not in useState directly)
import { toast } from "react-toastify";
import { Prompt } from "react-router-dom";

const ManageAddresses = ({ saveAddress, ...props }) => {
  const [addressToSave, setAddressToSave] = useState({ ...props.newAddress });
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [shouldBlockNavigation, setShouldBlockNavigation] = useState(false);

  useEffect(() => {
    if (props.addresses.length == 0) {
      props.loadAddresses();
    }
  }, []);

  useEffect(() => {
    if (props.match.params.id && props.addresses.length !== 0) {
      const address = props.addresses.find(
        (a) => a.id == props.match.params.id
      );
      if (!address) props.history.push("/page-not-found");
      setAddressToSave(address);
    }
  }, [props.addresses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShouldBlockNavigation(false);
    if (!inputIsValid()) return;
    setIsSaving(true);
    saveAddress(addressToSave)
      .then(() => {
        toast.success("Address Saved Successfully.");
        props.history.push("/addresses");
      })
      .catch((err) => {
        toast.error("Address Not Saved: " + err.message);
        setIsSaving(false);
      });
  };

  const handleFieldChange = (e) => {
    setShouldBlockNavigation(true);
    const name = e.target.name;
    const value = e.target.value;
    setAddressToSave((prev) => ({ ...prev, [name]: value }));
  };

  const inputIsValid = () => {
    const err = {};
    if (!addressToSave.province) {
      err.province = "Please provide a province.";
    }
    if (!addressToSave.city) {
      err.city = "Please provide a city.";
    }
    if (!addressToSave.street) {
      err.street = "Please provide a street.";
    }
    setValidationErrors(err);
    return Object.keys(err).length === 0;
  };

  return (
    <>
      <Prompt
        when={shouldBlockNavigation}
        message="You have unsaved changes, are you sure you want to leave?"
      />

      <div className="jumbotron">
        <h1>Manage Addresses</h1>
      </div>

      <div className="page-main-content">
        <h2>{props.match.params.id ? "Edit" : "Add"} Address</h2>
        <AddressForm
          address={addressToSave}
          handleSubmit={handleSubmit}
          handleFieldChange={handleFieldChange}
          validationErrors={validationErrors}
          isSaving={isSaving}
          isLoading={props.addresses.length == 0}
          preloadFields={props.match.params.id ? true : false}
        />
      </div>
    </>
  );
};

ManageAddresses.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.object).isRequired,
  newAddress: PropTypes.object.isRequired,
  loadAddresses: PropTypes.func.isRequired,
  saveAddress: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    addresses: state.addresses,
    newAddress: newAddress,
  };
};

const mapDispatchToProps = {
  loadAddresses,
  saveAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAddresses);
