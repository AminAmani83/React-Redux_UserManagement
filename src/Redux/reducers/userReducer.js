import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const userReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case types.CREATE_USER_SUCCESS:
      return [...state, { ...action.user }];
    case types.UPDATE_USER_SUCCESS:
      return state.map((user) =>
        user.id === action.user.id ? action.user : user
      );
    case types.LOAD_USERS_SUCCESS:
      return action.users;
    case types.DELETE_USER_SUCCESS:
      return state.filter((user) => user.id !== action.userId);
    default:
      return state;
  }
};

export default userReducer;
