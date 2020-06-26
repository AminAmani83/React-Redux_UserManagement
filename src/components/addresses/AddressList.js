import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AddressList = (props) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Province</th>
            <th>City</th>
            <th>Street</th>
            <th>
              <button
                className="btn btn-outline-info"
                onClick={props.handleAddAddressClick}
              >
                Add
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.addresses.length === 0 ? (
            <tr>
              <td colSpan={5}>
                <div className="row">
                  <div className="text-center mt-5 text-warning col-6 offset-3">
                    No Addresses Found
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            props.addresses.map((adr) => {
              return (
                <tr key={adr.id}>
                  <td>{adr.id}</td>
                  <td>
                    <Link to={`/address/${adr.id}`}>{adr.province}</Link>
                  </td>
                  <td>{adr.city}</td>
                  <td>{adr.street}</td>
                  <td>
                    <button
                      name={adr.id}
                      className="btn btn-outline-danger"
                      onClick={props.handleDeleteAddressClick}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </>
  );
};

AddressList.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDeleteAddressClick: PropTypes.func.isRequired,
  handleAddAddressClick: PropTypes.func.isRequired,
};

export default AddressList;
