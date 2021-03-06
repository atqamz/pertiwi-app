import "./MyOrder.css";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../_actions/orderAction";

import Loading from "../layout/Loading/Loading";

const MyOrder = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.ordersState);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className='myOrderPage'>
            <div className='myOrderContainer'>
              <h1>My Order(s)</h1>

              <div className='myOrderHeader'>
                <p>Order ID</p>
                <p>Total Amount</p>
              </div>

              {orders &&
                orders.map((order) => (
                  <Link to={`/order/${order._id}`} className='myOrderList'>
                    <p>{order._id}</p>
                    <p>
                      {order.totalPrice.toLocaleString("en-US", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyOrder;
