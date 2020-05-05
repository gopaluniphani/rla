import {
  STUDENT_LOADED,
  STUDENT_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_PROFILE,
} from "../actions/types";

const initialState = {
  student_token: localStorage.getItem("student_token"),
  isAuthenticated: null,
  isLoading: false,
  student: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STUDENT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case STUDENT_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        student: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("student_token", action.payload.student_token);
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
      localStorage.removeItem("student_token");
      return {
        ...state,
        student_token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        student: action.payload,
      };
    default:
      return state;
  }
}
