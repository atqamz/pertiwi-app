import axios from "axios";
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
  UPDATE_USER_PASSWORD_REQUEST,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAIL,
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
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
} from "../_constants/userConstant";

// User Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post("/api/login", { email, password }, config);

    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// User Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post("api/register", userData, config);

    console.log(data);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// User Logout
export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/logout");
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get User
export const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });

    const { data } = await axios.get(`/api/me`);

    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update User
export const updateUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put("/api/me/update", userData, config);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update User Password
export const updateUserPassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_PASSWORD_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put("/api/password/update", password, config);

    dispatch({ type: UPDATE_USER_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_PASSWORD_FAIL, payload: error.response.data.message });
  }
};

// User Forgot Password
export const forgotUserPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGET_USER_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/api/password/reset", email, config);

    dispatch({ type: FORGET_USER_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FORGET_USER_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// User Reset Password
export const resetUserPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: RESET_USER_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/password/reset/${token}`, password, config);

    dispatch({ type: RESET_USER_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RESET_USER_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Users -- Admin
export const adminGetAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_GET_ALL_USERS_REQUEST });

    const { data } = await axios.get("/api/admin/users");

    dispatch({ type: ADMIN_GET_ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get User -- Admin
export const adminGetUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_GET_USER_REQUEST });

    const { data } = await axios.get(`/api/admin/user/${userId}`);

    dispatch({ type: ADMIN_GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update User -- Admin
export const adminUpdateUser = (userId, userData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_UPDATE_USER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/admin/user/${userId}`, userData, config);

    dispatch({ type: ADMIN_UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete User -- Admin
export const adminDeleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/admin/user/${userId}`);

    dispatch({ type: ADMIN_DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
