import {
  GET_COMPLETED_LABS,
  CLEAR_COMPLETED_LABS,
  ADD_COMPLETED_LAB,
} from "../actions/types";

const initialState = {
  labs: [],
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMPLETED_LABS:
      return {
        labs: action.payload,
        isLoaded: true,
      };
    case CLEAR_COMPLETED_LABS:
      return {
        labs: [],
        isLoaded: false,
      };
    case ADD_COMPLETED_LAB:
      return {
        ...state,
        labs: [...state.labs, action.payload],
      };
    default:
      return state;
  }
}
