import {
  CLEAR_ERRORS,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  UPDATE_USER_PASSWORD_REQUEST,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAIL,
  UPDATE_USER_PASSWORD_RESET,
  FORGET_USER_PASSWORD_REQUEST,
  FORGET_USER_PASSWORD_SUCCESS,
  FORGET_USER_PASSWORD_FAIL,
  RESET_USER_PASSWORD_REQUEST,
  RESET_USER_PASSWORD_SUCCESS,
  RESET_USER_PASSWORD_FAIL,
  ADMIN_GET_ALL_USERS_REQUEST,
  ADMIN_GET_ALL_USERS_SUCCESS,
  ADMIN_GET_ALL_USERS_FAIL,
  ADMIN_GET_USER_REQUEST,
  ADMIN_GET_USER_SUCCESS,
  ADMIN_GET_USER_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_UPDATE_USER_RESET,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
  ADMIN_DELETE_USER_RESET,
} from "../_constants/userConstant";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
    case REGISTER_USER_REQUEST:
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuth: false,
      };
    case UPDATE_USER_REQUEST:
    case UPDATE_USER_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: action.payload.success,
        user: action.payload.user,
      };
    case UPDATE_USER_SUCCESS:
    case UPDATE_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
      };

    case LOGIN_USER_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuth: false,
        user: null,
        error: action.payload,
      };
    case GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuth: false,
        user: null,
        error: action.payload,
      };
    case UPDATE_USER_FAIL:
    case UPDATE_USER_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_USER_RESET:
    case UPDATE_USER_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: false,
        user: null,
      };
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FORGET_USER_PASSWORD_REQUEST:
    case RESET_USER_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGET_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case RESET_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };
    case FORGET_USER_PASSWORD_FAIL:
    case RESET_USER_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const adminUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
      };

    case ADMIN_GET_ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const adminUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_GET_USER_REQUEST:
    case ADMIN_UPDATE_USER_REQUEST:
    case ADMIN_DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    case ADMIN_UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
      };
    case ADMIN_DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
      };

    case ADMIN_GET_USER_FAIL:
    case ADMIN_UPDATE_USER_FAIL:
    case ADMIN_DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADMIN_UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case ADMIN_DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
