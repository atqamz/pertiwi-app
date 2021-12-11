import "./Topbar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart } from "@mui/icons-material";

import { useSelector } from "react-redux";

import UserOption from "../UserOption/UserOption";

const Topbar = ({ user, isAuth }) => {
  const { cartItems } = useSelector((state) => state.cartState);
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className='topbarToggler' onClick={() => setOpen(!open)}>
        <Menu />
      </div>
      <Link to='/' className='topbarLogo'>
        <img src='/logoputih.png' alt='Pertiwi Logo' />
        <img src='/logotextputih.png' alt='Pertiwi Logo Text' />
      </Link>
      <ul className={open && "active"}>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/product'>Shop</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/help'>Help</Link>
        </li>
      </ul>
      <div className='topbarShortcut'>
        <Link to='/cart' className='topbarCart'>
          <ShoppingCart />
          {cartItems.length > 0 && <span>{cartItems.length}</span>}
        </Link>
        <UserOption user={user} isAuth={isAuth} />
      </div>
    </nav>
  );
};

export default Topbar;
