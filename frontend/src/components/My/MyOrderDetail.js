import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getOrder } from "../../_actions/orderAction";

import Loading from "../layout/Loading/Loading";

const MyOrderDetail = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, order } = useSelector((state) => state.orderState);
  const { user } = useSelector((state) => state.userState);

  const address =
    order &&
    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.province}, ${order.shippingInfo.country}, ${order.shippingInfo.postCode}`;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrder(match.params.orderId));
  }, [dispatch, error, alert, match.params.orderId]);

  return (
    <Fragment>
      {loading || !order ? (
        <Loading />
      ) : (
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

                {order &&
                  order.orderItems.map((item) => (
                    <div className='cartContainer'>
                      <Link to={`/product/${item.product}`} className='productInfo'>
                        <img src={item.image} alt='product' />
                        <div className='productInfoDetail'>
                          <p>{item.name}</p>
                          <p>{item.productType}</p>
                          <p>
                            {item.productTypePrice.toLocaleString("en-US", {
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
                        {(item.productTypePrice * item.quantity).toLocaleString("en-US", {
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
                    {order.itemsPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </div>
                <div>
                  <p>Tax</p>
                  <p>
                    {order.taxPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </div>
              </div>

              <div className='cartSummaryTotal'>
                <h3>Total</h3>
                <h3>
                  {order.totalPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </h3>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyOrderDetail;
