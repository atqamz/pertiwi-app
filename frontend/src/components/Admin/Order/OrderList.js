import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, adminGetAllOrders } from "../../../_actions/orderAction";

import Loading from "../../layout/Loading/Loading";

const OrderList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.adminOrdersState);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(adminGetAllOrders());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div>
            <div className='dashboardContainer'>
              <h1>Order</h1>

              <div className='myOrderHeader'>
                <p>Order ID</p>
                <p>Total Amount</p>
              </div>

              {orders &&
                orders.map((order) => (
                  <Link to={`/admin/order/${order._id}`} className='myOrderList'>
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

export default OrderList;
