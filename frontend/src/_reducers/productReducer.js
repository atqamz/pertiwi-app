import {
  CLEAR_ERRORS,
  ADMIN_ADD_PRODUCT_REQUEST,
  ADMIN_ADD_PRODUCT_SUCCESS,
  ADMIN_ADD_PRODUCT_FAIL,
  ADMIN_ADD_PRODUCT_RESET,
  ADMIN_GET_ALL_PRODUCTS_REQUEST,
  ADMIN_GET_ALL_PRODUCTS_SUCCESS,
  ADMIN_GET_ALL_PRODUCTS_FAIL,
  ADMIN_UPDATE_PRODUCT_REQUEST,
  ADMIN_UPDATE_PRODUCT_SUCCESS,
  ADMIN_UPDATE_PRODUCT_FAIL,
  ADMIN_UPDATE_PRODUCT_RESET,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_DELETE_PRODUCT_FAIL,
  ADMIN_DELETE_PRODUCT_RESET,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
} from "../_constants/productConstant";

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_REQUEST:
      return {
        loading: true,
      };

    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload.product,
      };

    case GET_PRODUCT_FAIL:
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

export const getAllProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_GET_ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
      };

    case ADMIN_GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
      };

    case ADMIN_GET_ALL_PRODUCTS_FAIL:
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

export const adminProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ADD_PRODUCT_REQUEST:
    case ADMIN_UPDATE_PRODUCT_REQUEST:
    case ADMIN_DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAdded: action.payload.success,
      };
    case ADMIN_UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
      };
    case ADMIN_DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
      };

    case ADMIN_UPDATE_PRODUCT_FAIL:
    case ADMIN_DELETE_PRODUCT_FAIL:
    case ADMIN_ADD_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADMIN_ADD_PRODUCT_RESET:
      return {
        ...state,
        isAdded: false,
      };
    case ADMIN_UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case ADMIN_DELETE_PRODUCT_RESET:
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
