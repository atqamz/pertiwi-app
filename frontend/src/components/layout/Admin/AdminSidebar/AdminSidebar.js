import "./AdminSidebar.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation().pathname + useLocation().hash;

  return (
    <div className='sidebar'>
      <Link to='/' className='sidebarLogo'>
        <img src='/logo.png' alt='Pertiwi Logo' />
        <img src='/logotext.png' alt='Pertiwi Logo Text' />
      </Link>
      <div className='sidebarItems'>
        <Link
          to='/admin/dashboard'
          className={location === "/admin/dashboard" && "active"}
        >
          <img src='/assets/sidebar/dashboard.png' alt='Dashboard' />
          <p>Dashboard</p>
        </Link>

        <Link to='/admin/products' className={location === "/admin/products" && "active"}>
          <img src='/assets/sidebar/products.png' alt='Products' />
          <p>Products</p>
        </Link>

        <Link to='/admin/orders' className={location === "/admin/orders" && "active"}>
          <img src='/assets/sidebar/orders.png' alt='Orders' />
          <p>Orders</p>
        </Link>

        <Link to='/admin/users' className={location === "/admin/users" && "active"}>
          <img src='/assets/sidebar/users.png' alt='Users' />
          <p>Users</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
