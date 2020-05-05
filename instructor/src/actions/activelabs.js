import axios from "axios";

import { GET_ACTIVE_LABS, MARK_COMPLETED, ADD_COMPLETED_LAB } from "./types";
import { tokenConfig } from "./auth";
import { createMessage, returnErrors } from "./messages";

export const loadActiveLabs = (activelabs) => (dispatch, getState) => {
  axios
    .all(
      activelabs.map((lab) =>
        axios.get(`/api/activelabs/${lab}`, tokenConfig(getState))
      )
    )
    .then((res) => {
      return res.map((r) => r.data);
    })
    .then((data) => {
      dispatch({
        type: GET_ACTIVE_LABS,
        payload: data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const markCompleted = (lab_id) => (dispatch, getState) => {
  const body = { lab_id };
  axios
    .post("/api/activelabs/completed", body, tokenConfig(getState))
    .then((res) => {
      dispatch(
        createMessage({ completed: "lab marked completed successfully" })
      );
      dispatch({
        type: MARK_COMPLETED,
        payload: lab_id,
      });
      dispatch({
        type: ADD_COMPLETED_LAB,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
