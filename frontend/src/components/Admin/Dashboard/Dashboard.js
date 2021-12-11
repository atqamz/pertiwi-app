import "./Dashboard.css";
import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { adminGetAllProducts } from "../../../_actions/productAction";
import { adminGetAllUsers } from "../../../_actions/userAction";
import { adminGetAllOrders } from "../../../_actions/orderAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.allProductsState);
  const { users } = useSelector((state) => state.adminUsersState);
  const { orders, totalAmount } = useSelector((state) => state.adminOrdersState);

  useEffect(() => {
    dispatch(adminGetAllProducts());
    dispatch(adminGetAllUsers());
    dispatch(adminGetAllOrders());
  }, [dispatch]);

  return (
    <Fragment>
      <div className='dashboardContainer'>
        <h1>Dashboard</h1>
        <div className='dashboardInfo'>
          <div className='dashboardInfoPanel'>
            <img src='/assets/admin/dashboard/dashboardIncome.png' alt='Panel Icon' />
            <div>
              <p>Total Income</p>
              <h3>
                {totalAmount &&
                  totalAmount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "IDR",
                  })}
              </h3>
            </div>
          </div>
        </div>
        <div className='dashboardInfo'>
          <div className='dashboardInfoPanel'>
            <img src='/assets/admin/dashboard/dashboardProduct.png' alt='Panel Icon' />
            <div>
              <p>Total Products</p>
              <h3>{products && products.length}</h3>
            </div>
          </div>

          <div className='dashboardInfoPanel'>
            <img src='/assets/admin/dashboard/dashboardOrder.png' alt='Panel Icon' />
            <div>
              <p>Total Orders</p>
              <h3>{orders && orders.length}</h3>
            </div>
          </div>

          <div className='dashboardInfoPanel'>
            <img src='/assets/admin/dashboard/dashboardUser.png' alt='Panel Icon' />
            <div>
              <p>Total Users</p>
              <h3>{users && users.length}</h3>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
