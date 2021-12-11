import "./Sideview.css";
import React from "react";
import { Link } from "react-router-dom";

const Sideview = () => {
  return (
    <div className='sideview'>
      <Link to='/' className='sideviewHeader'>
        <img src='/logo.png' alt='Pertiwi Logo' />
        <img src='/logotext.png' alt='Pertiwi Logo Text' />
      </Link>
      <div className='sideviewLeaf'>
        <img src='/assets/notFound/leftLeaf.png' alt='Leaf' />
        <img src='/assets/notFound/rightLeaf.png' alt='Leaf' />
      </div>
      <img src='/assets/authPage/sideviewBg.png' alt='Auth Background' />
    </div>
  );
};

export default Sideview;
