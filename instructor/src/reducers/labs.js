import {
  GET_LABS,
  CLEAR_LABS,
  CREATE_LAB,
  ADD_LABCYCLE,
} from "../actions/types";

const initialState = {
  labs: [],
  isLoaded: false,
  newLab: "",
  isCreated: false,
  isAdded: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LABS:
      return {
        ...state,
        labs: action.payload,
        isLoaded: true,
      };
    case CLEAR_LABS:
      return {
        labs: [],
        isLoaded: false,
        newlab: "",
        isCreated: false,
      };
    case CREATE_LAB:
      return {
        ...state,
        labs: [...state.labs, action.payload],
        isCreated: true,
        newlab: action.payload._id,
      };
    case ADD_LABCYCLE:
      return {
        ...state,
        isAdded: true,
      };
    default:
      return state;
  }
}
