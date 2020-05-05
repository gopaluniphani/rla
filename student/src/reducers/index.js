import { combineReducers } from "redux";

import auth from "./auth";
import messages from "./messages";
import errors from "./errors";
import activelabs from "./activelabs";
import completedlabs from "./completedlabs";

export default combineReducers({
  auth,
  messages,
  errors,
  activelabs,
  completedlabs,
});
