import "./Loading.css";
import React from "react";
import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className='loading'>
      <CircularProgress size={100} color='inherit' />
    </div>
  );
};

export default Loading;
