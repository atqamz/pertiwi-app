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
        You can't ordered yet. But we will confirm your orders and let you get the further
        information.
      </Typography>
      <Link to='/orders'>View Order(s)</Link>
    </div>
  );
};

export default OrderSuccess;
