import * as types from "./actionTypes";
import * as userApi from "../../api/userApi";
import { apiCallBegin, apiCallError } from "./apiStatusActions";

export const createUserSuccess = (user) => {
  return { type: types.CREATE_USER_SUCCESS, user };
};

export const updateUserSuccess = (user) => {
  return { type: types.UPDATE_USER_SUCCESS, user };
};

const loadUsersSuccess = (users) => {
  return { type: types.LOAD_USERS_SUCCESS, users };
};

const deleteUserSuccess = (userId) => {
  return { type: types.DELETE_USER_SUCCESS, userId };
};

// const loadUsersError = () => {
//   return ...
// }

// 1. The Normal Format
export const loadUsers = () => {
  return function (dispatch) {
    dispatch(apiCallBegin());
    return userApi
      .getUsers()
      .then((usersObject) => {
        console.log(usersObject);
        dispatch(loadUsersSuccess(usersObject.records));
      })
      .catch((error) => {
        dispatch(apiCallError(error.message));
        throw error;
      });
  };
};

// 2. Using Async
export const saveUser = (user) => {
  return async (dispatch) => {
    if (!user.id) {
      // adding a new user:
      // MySQL expects to not receive an id value for Insert, even if it is empty or null
      delete user.id;
    }

    try {
      dispatch(apiCallBegin());
      const savedUserId = await userApi.saveUser(user);
      if (user.id) {
        // updating an existing user
        dispatch(updateUserSuccess(user));
      } else {
        // else: adding a new user
        user.id = savedUserId;
        dispatch(createUserSuccess(user));
      }
    } catch (error) {
      dispatch(apiCallError(error.message));
      throw error;
    }
  };
};

export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(apiCallBegin());
      await userApi.deleteUser(userId);
      dispatch(deleteUserSuccess(userId));
    } catch (error) {
      dispatch(apiCallError(error.message));
      throw error;
    }
  };
};
