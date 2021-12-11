import "./Cart.css";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../_actions/cartAction";
import { IconButton } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartState);

  const increaseQty = (productId, productType, quantity, stock) => {
    const qty = quantity + 1;
    if (stock <= quantity) return;

    dispatch(addToCart(productId, productType, qty));
  };

  const decreaseQty = (productId, productType, quantity) => {
    const qty = quantity - 1;
    if (quantity <= 1) return;

    dispatch(addToCart(productId, productType, qty));
  };

  const handleRemoveFromCart = (typeId) => {
    dispatch(removeFromCart(typeId));
  };

  const handleCheckout = () => {
    history.push("/login?redirect=checkout");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className='emptyCartPage'>
          <div className='emptyCartContainer'>
            <img src='/assets/cartPage/emptyCart.png' alt='Empty Cart' />
            <h1>You haven’t adding any product yet.</h1>
            <Link to='/product'>View Products</Link>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className='cartPage'>
            <div>
              <h1>Your Cart</h1>
              <div className='cartHeader'>
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
              </div>

              {cartItems &&
                cartItems.map((item) => (
                  <div className='cartContainer'>
                    <Link to={`/product/${item.product}`} className='productInfo'>
                      <img src={item.image} alt='product' />
                      <div className='productInfoDetail'>
                        <p>{item.name}</p>
                        <p>{item.productType.typeName}</p>
                        <p>
                          {item.productType.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </p>
                      </div>
                    </Link>

                    <div className='productQty'>
                      <IconButton
                        onClick={() =>
                          decreaseQty(item.product, item.productType, item.quantity)
                        }
                      >
                        <Remove />
                      </IconButton>
                      <input readOnly type='number' value={item.quantity} />
                      <IconButton
                        onClick={() =>
                          increaseQty(
                            item.product,
                            item.productType,
                            item.quantity,
                            item.productType.stock
                          )
                        }
                      >
                        <Add />
                      </IconButton>
                    </div>

                    <p className='productSubtotal'>
                      {(item.productType.price * item.quantity).toLocaleString("en-US", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </p>

                    <div className='productDelete'>
                      <IconButton
                        onClick={() => handleRemoveFromCart(item.productType._id)}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  </div>
                ))}
            </div>

            <div>
              <h1>Summary</h1>
              <div className='cartSummaryHeader'>
                <p>Description</p>
                <p>Price</p>
              </div>

              <div className='cartSummaryList'>
                <div>
                  <p>Gross Total</p>
                  <p>
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.productType.price * item.quantity,
                        0
                      )
                      .toLocaleString("en-US", {
                        style: "currency",
                        currency: "IDR",
                      })}
                  </p>
                </div>
                <div>
                  <p>Tax</p>
                  <p>
                    {(
                      cartItems.reduce(
                        (acc, item) => acc + item.productType.price * item.quantity,
                        0
                      ) * 0.02
                    ).toLocaleString("en-US", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </div>
              </div>

              <div className='cartSummaryTotal'>
                <h3>Total</h3>
                <h3>
                  {(
                    cartItems.reduce(
                      (acc, item) => acc + item.productType.price * item.quantity,
                      0
                    ) +
                    cartItems.reduce(
                      (acc, item) => acc + item.productType.price * item.quantity,
                      0
                    ) *
                      0.02
                  ).toLocaleString("en-US", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </h3>
              </div>

              <button onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
