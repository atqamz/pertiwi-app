import "./CreateOrder.css";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createOrder } from "../../_actions/orderAction";
import { removeFromCart } from "../../_actions/cartAction";

const CreateOrder = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cartState);
  const { user } = useSelector((state) => state.userState);
  const { error, isCreated } = useSelector((state) => state.orderState);

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.province}, ${shippingInfo.country}, ${shippingInfo.postCode}`;

  const grossTotal = cartItems.reduce(
    (acc, item) => acc + item.productType.price * item.quantity,
    0
  );
  const taxPrice = grossTotal * 0.02;
  const totalPrice = grossTotal + taxPrice;

  const handleCreateOrder = () => {
    const order = {
      shippingInfo,
      orderItems: cartItems.map((item) => ({
        product: item.product,
        name: item.name,
        productType: item.productType.typeName,
        productTypePrice: item.productType.price,
        quantity: item.quantity,
        image: item.image,
      })),
      itemsPrice: grossTotal,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
    };

    dispatch(createOrder(order));

    localStorage.setItem("shippingInfo", JSON.stringify([]));
    cartItems.forEach((item) => dispatch(removeFromCart(item.productType._id)));

    history.push("/order/success");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isCreated) {
      alert.success("Order Created!");
    }
  }, [dispatch, error, alert, isCreated]);

  return (
    <Fragment>
      <div className='createOrderPage'>
        <div>
          <h1>Shipping Information</h1>
          <div className='shippingInformation'>
            <div>
              <p>Name</p>
              <span>:</span>
              <p>{user && user.name}</p>
            </div>
            <div>
              <p>Phone</p>
              <span>:</span>

              <p>{user && user.phone}</p>
            </div>
            <div>
              <p>Address</p>
              <span>:</span>

              <p>{address}</p>
            </div>
          </div>

          <h1>Order Item(s)</h1>
          <div className='orderItems'>
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
                    <input readOnly type='number' value={item.quantity} />
                  </div>

                  <p className='productSubtotal'>
                    {(item.productType.price * item.quantity).toLocaleString("en-US", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </div>
              ))}
          </div>
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
                {grossTotal.toLocaleString("en-US", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
            <div>
              <p>Tax</p>
              <p>
                {taxPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
          </div>

          <div className='cartSummaryTotal'>
            <h3>Total</h3>
            <h3>
              {totalPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "IDR",
              })}
            </h3>
          </div>

          <button className='shippingBtn' onClick={handleCreateOrder}>
            Create Order
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateOrder;
