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

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case GET_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isCreated: action.payload.success,
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload.order,
      };

    case CREATE_ORDER_FAIL:
    case GET_ORDER_FAIL:
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

export const ordersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MY_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_MY_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
      };

    case GET_MY_ORDERS_FAIL:
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

export const adminOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_GET_ALL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
      };

    case ADMIN_GET_ALL_ORDERS_FAIL:
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
