import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO,
} from "../_constants/cartConstant";

export const cartReducer = (state = { cartItems: [], shippingInfo: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      // const isItemExist = state.cartItems.find((i) => i.product === item.product);

      const matchIndex = state.cartItems.findIndex(
        (item) => item.productType._id === newItem.productType._id
      );

      if (matchIndex !== -1) {
        let newCart = state.cartItems;
        newCart[matchIndex] = {
          ...newCart[matchIndex],
          quantity: newItem.quantity,
        };

        return {
          ...state,
          cartItems: newCart,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.productType._id !== action.payload),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
