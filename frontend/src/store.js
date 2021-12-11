import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// === Reducers
import {
  userReducer,
  adminUsersReducer,
  adminUserReducer,
} from "./_reducers/userReducer";
import { cartReducer } from "./_reducers/cartReducer";
import {
  getAllProductsReducer,
  productReducer,
  adminProductReducer,
} from "./_reducers/productReducer";
import {
  adminOrdersReducer,
  orderReducer,
  ordersReducer,
} from "./_reducers/orderReducer";
// ===============

const reducer = combineReducers({
  userState: userReducer,
  cartState: cartReducer,
  allProductsState: getAllProductsReducer,
  productState: productReducer,
  adminProductState: adminProductReducer,
  orderState: orderReducer,
  ordersState: ordersReducer,
  adminUsersState: adminUsersReducer,
  adminUserState: adminUserReducer,
  adminOrdersState: adminOrdersReducer,
});

const initialState = {
  cartState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
