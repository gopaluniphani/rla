import {
  GET_ACTIVE_LABS,
  CLEAR_ACTIVE_LABS,
  ADD_ACTIVE_LAB,
  MARK_COMPLETED,
} from "../actions/types";

const initialState = {
  labs: [],
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVE_LABS:
      return {
        labs: action.payload,
        isLoaded: true,
      };
    case CLEAR_ACTIVE_LABS:
      return {
        labs: [],
        isLoaded: false,
      };
    case MARK_COMPLETED:
      const l = state.labs.filter((lab) => lab._id !== action.payload);
      return {
        ...state,
        labs: l,
      };
    default:
      return state;
  }
}
