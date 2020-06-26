import { combineReducers } from "redux";
import users from "./userReducer";
import addresses from "./addressReducer";
import pendingApiCallsCount from "./apiStatusReducer"; // must use the original reducer name, can't use alias here

const rootReducer = combineReducers({
  users,
  addresses,
  pendingApiCallsCount,
});

export default rootReducer;
