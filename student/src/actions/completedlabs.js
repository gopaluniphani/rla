import { GET_COMPLETED_LABS } from "./types";
import { tokenConfig } from "./auth";

import axios from "axios";

export const loadCompletedLabs = (lab_ids) => (dispatch, getState) => {
  axios
    .all(
      lab_ids.map((lab) =>
        axios.get(`/api/activelabs/${lab}`, tokenConfig(getState))
      )
    )
    .then((res) => {
      return res.map((r) => r.data);
    })
    .then((data) => {
      dispatch({
        type: GET_COMPLETED_LABS,
        payload: data,
      });
    });
};
