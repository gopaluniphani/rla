import axios from "axios";
import { GET_LABS, CREATE_LAB, ADD_LABCYCLE, ADD_ACTIVE_LAB } from "./types";
import { returnErrors, createMessage } from "./messages";
import { tokenConfig } from "./auth";

export const getLabs = () => (dispatch) => {
  axios
    .get("/api/labs/list")
    .then((res) => {
      dispatch({
        type: GET_LABS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const createLab = (code, name) => (dispatch) => {
  const body = { code: code, name: name };
  axios
    .post("/api/labs", body)
    .then((res) => {
      dispatch(createMessage({ created: "Lab Created Successfully" }));
      dispatch({
        type: CREATE_LAB,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const addLabcycle = (name, description, lab_id) => (dispatch) => {
  const body = { name, description };
  axios
    .post(`./api/labs/labcycle/${lab_id}`, body)
    .then((res) => {
      dispatch(createMessage({ added: "Added labcycle successfully" }));
      dispatch({
        type: ADD_LABCYCLE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const addActiveLab = (lab_id) => (dispatch, getState) => {
  const body = { lab_id: lab_id };
  axios
    .post("api/activelabs", body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_ACTIVE_LAB,
        payload: res.data,
      });
      dispatch(createMessage({ added: "added to activelabs" }));
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
