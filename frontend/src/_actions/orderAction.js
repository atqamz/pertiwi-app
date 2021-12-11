import axios from "axios";
import {
  CLEAR_ERRORS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  ADMIN_GET_ALL_ORDERS_REQUEST,
  ADMIN_GET_ALL_ORDERS_SUCCESS,
  ADMIN_GET_ALL_ORDERS_FAIL,
} from "../_constants/orderConstant";

// Create Order
export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post("/api/order/add", orderData, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MY_ORDERS_REQUEST });

    const { data } = await axios.get("/api/orders/me");

    dispatch({ type: GET_MY_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Order
export const getOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST });

    const { data } = await axios.get(`/api/order/${orderId}`);

    dispatch({ type: GET_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Orders -- Admin
export const adminGetAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_GET_ALL_ORDERS_REQUEST });

    const { data } = await axios.get("/api/admin/orders");

    dispatch({ type: ADMIN_GET_ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
