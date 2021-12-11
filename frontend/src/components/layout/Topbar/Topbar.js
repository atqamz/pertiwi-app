import "./Topbar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import UserOption from "../UserOption/UserOption";

const Topbar = ({ user, isAuth }) => {
  const location = useLocation();
  const { cartItems } = useSelector((state) => state.cartState);
  const [open, setOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

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
        <li className='help'>
          <Link to={location.pathname} onClick={() => setHelpOpen(!helpOpen)}>
            Help
          </Link>
          <ul
            className={`helpList ${helpOpen && "active"}`}
            onClick={() => setHelpOpen(!helpOpen)}
            onMouseLeave={() => setHelpOpen(false)}
          >
            <li>
              <Link to='/help/products'>Products</Link>
            </li>
            <li>
              <Link to='/help/shipping'>Shipping</Link>
            </li>
          </ul>
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
