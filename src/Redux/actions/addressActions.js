import * as types from "./actionTypes";
import * as AddressApi from "../../api/addressApi";
import { apiCallBegin, apiCallError } from "./apiStatusActions";

const loadAddressesSuccess = (addresses) => {
  return { type: types.LOAD_ADDRESSES_SUCCESS, addresses };
};

const createAddressSuccess = (address) => {
  return { type: types.CREATE_ADDRESS_SUCCESS, address };
};

const updateAddressSuccess = (address) => {
  return { type: types.UPDATE_ADDRESS_SUCCESS, address };
};

const deleteAddressSuccess = (addressId) => {
  return { type: types.DELETE_ADDRESS_SUCCESS, addressId };
};

export const loadAddresses = () => {
  return (dispatch) => {
    dispatch(apiCallBegin());
    return AddressApi.getAddresses()
      .then((addressesObject) => {
        dispatch(loadAddressesSuccess(addressesObject.records));
      })
      .catch((error) => {
        dispatch(apiCallError(error.message));
        throw error;
      });
  };
};

export const saveAddress = (address) => {
  if (!address.id) {
    // adding a new address:
    // MySQL expects to not receive an id value for Insert, even if it is empty or null
    delete address.id;
  }

  return async (dispatch) => {
    try {
      dispatch(apiCallBegin());
      const savedAddressId = await AddressApi.saveAddress(address);
      if (address.id) {
        // updating an existing user
        dispatch(updateAddressSuccess(address));
      } else {
        // else: adding a new user
        address.id = savedAddressId;
        dispatch(createAddressSuccess(address));
      }
    } catch (error) {
      dispatch(apiCallError(error.message));
      throw error;
    }
  };
};

export const deleteAddress = (addressId) => {
  return async (dispatch) => {
    try {
      await AddressApi.deleteAddress(addressId);
      dispatch(deleteAddressSuccess(addressId));
    } catch (error) {
      dispatch(apiCallError(error.message));
      throw error;
    }
  };
};
