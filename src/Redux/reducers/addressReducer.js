import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const addressReducer = (state = initialState.addresses, action) => {
  switch (action.type) {
    case types.LOAD_ADDRESSES_SUCCESS:
      return action.addresses;
    case types.UPDATE_ADDRESS_SUCCESS:
      return state.map((adr) =>
        adr.id === action.address.id ? action.address : adr
      );
    case types.CREATE_ADDRESS_SUCCESS:
      return [...state, { ...action.address }];
    case types.DELETE_ADDRESS_SUCCESS:
      return state.filter((adr) => adr.id !== action.addressId);
    default:
      return state;
  }
};

export default addressReducer;
