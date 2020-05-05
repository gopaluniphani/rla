import { CREATE_MESSAGE, GET_ERRORS } from "./types";

// CREATE MESSAGE
export const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};

// CREATE MESSAGE AND DISPATCH
export const displayMessage = (msg) => (dispatch) => {
  dispatch({
    type: CREATE_MESSAGE,
    payload: msg,
  });
};

// RETURN ERRORS
export const returnErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status },
  };
};

// CREATE ERRORS AND DISPATCH
export const displayErrors = (msg, status) => (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    payload: { msg, status },
  });
};
