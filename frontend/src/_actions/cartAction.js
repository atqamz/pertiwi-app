import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO,
} from "../_constants/cartConstant";

// Add to cart
export const addToCart =
  (productId, productType, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/product/${productId}`);

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        productType: productType,
        image: data.product.images[0].url,
        quantity,
      },
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cartState.cartItems));
  };

// Remove from cart
export const removeFromCart = (productTypeId) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_CART, payload: productTypeId });

  localStorage.setItem("cartItems", JSON.stringify(getState().cartState.cartItems));
};

// Save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_INFO, payload: data });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
