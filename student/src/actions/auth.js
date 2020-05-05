import axios from "axios";
import { returnErrors, createMessage } from "./messages";

import {
  STUDENT_LOADED,
  STUDENT_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ACTIVE_LABS,
  CLEAR_COMPLETED_LABS,
  UPDATE_PROFILE,
} from "./types";

// Check token & Load Student
export const loadStudent = () => (dispatch, getState) => {
  //Instructor Loading
  dispatch({ type: STUDENT_LOADING });

  axios
    .get("/api/student/details", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: STUDENT_LOADED,
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

// Login student
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
    .post("/api/student/login", body, config)
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

// Register Student
export const register = (student) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify(student);

  axios
    .post("/api/student/register", body, config)
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
  dispatch({ type: LOGOUT_SUCCESS });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.student_token;

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

export const update = (student) => (dispatch, getState) => {
  axios
    .post("/api/student/profile", student, tokenConfig(getState))
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
    .post("/api/student/password", body, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage(res.data));
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
