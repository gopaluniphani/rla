import axios from "axios";
import { returnErrors, createMessage } from "./messages";

import {
  INSTRUCTOR_LOADED,
  INSTRUCTOR_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ACTIVE_LABS,
  CLEAR_COMPLETED_LABS,
  CLEAR_LABS,
  UPDATE_PROFILE,
} from "./types";

// Check token & Load Instructor
export const loadInstructor = () => (dispatch, getState) => {
  //Instructor Loading
  dispatch({ type: INSTRUCTOR_LOADING });

  axios
    .get("/api/instructor/details", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: INSTRUCTOR_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Login instructor
export const login = (college_id, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({ college_id, password });

  axios
    .post("/api/instructor/login", body, config)
    .then((res) => res.data)
    .then((data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Register Instructor
export const register = (instructor) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify(instructor);

  axios
    .post("/api/instructor/register", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  dispatch({ type: CLEAR_ACTIVE_LABS });
  dispatch({ type: CLEAR_COMPLETED_LABS });
  dispatch({ type: CLEAR_LABS });
  dispatch({ type: LOGOUT_SUCCESS });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.instructor_token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["x-auth-token"] = `${token}`;
  }

  return config;
};

export const update = (instructor) => (dispatch, getState) => {
  axios
    .post("/api/instructor/profile", instructor, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(createMessage({ updated: "Profile Updated Successfully" }));
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const changePassword = (oldPassword, newPassword) => (
  dispatch,
  getState
) => {
  const body = { oldPassword, newPassword };
  axios
    .post("/api/instructor/password", body, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage(res.data));
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
