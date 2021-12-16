import "./OrderSuccess.css";
import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import { Typography } from "@mui/material";

const OrderSuccess = () => {
  return (
    <div className='orderSuccess'>
      <CheckCircle />
      <Typography>
        Thank you for making the purchase process through our website, but the product is
        currently in the development stage. We will contact you as soon as the product is
        ready to use. Have a nice day!
      </Typography>
      <Link to='/order/me'>View Order(s)</Link>
    </div>
  );
};

export default OrderSuccess;
