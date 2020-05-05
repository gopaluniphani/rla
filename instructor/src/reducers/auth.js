import {
  INSTRUCTOR_LOADED,
  INSTRUCTOR_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_PROFILE,
} from "../actions/types";

const initialState = {
  instructor_token: localStorage.getItem("instructor_token"),
  isAuthenticated: null,
  isLoading: false,
  instructor: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INSTRUCTOR_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case INSTRUCTOR_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        instructor: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("instructor_token", action.payload.instructor_token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("instructor_token");
      return {
        ...state,
        instructor_token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        instructor: action.payload,
      };
    default:
      return state;
  }
}
