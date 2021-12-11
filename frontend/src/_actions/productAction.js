import axios from "axios";
import {
  CLEAR_ERRORS,
  ADMIN_ADD_PRODUCT_REQUEST,
  ADMIN_ADD_PRODUCT_SUCCESS,
  ADMIN_ADD_PRODUCT_FAIL,
  ADMIN_GET_ALL_PRODUCTS_REQUEST,
  ADMIN_GET_ALL_PRODUCTS_SUCCESS,
  ADMIN_GET_ALL_PRODUCTS_FAIL,
  ADMIN_UPDATE_PRODUCT_REQUEST,
  ADMIN_UPDATE_PRODUCT_SUCCESS,
  ADMIN_UPDATE_PRODUCT_FAIL,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_DELETE_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
} from "../_constants/productConstant";

// Get Product
export const getProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/product/${productId}`);

    dispatch({
      type: GET_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Products -- Admin
export const adminGetAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_GET_ALL_PRODUCTS_REQUEST });

    const { data } = await axios.get("/api/admin/products");

    dispatch({ type: ADMIN_GET_ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Add Product -- Admin
export const adminAddProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ADD_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post("/api/admin/product/add", productData, config);

    dispatch({
      type: ADMIN_ADD_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ADD_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product -- Admin
export const adminUpdateProduct = (productId, productData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/admin/product/${productId}`,
      productData,
      config
    );

    dispatch({
      type: ADMIN_UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product -- Admin
export const adminDeleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/admin/product/${productId}`);

    dispatch({ type: ADMIN_DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
