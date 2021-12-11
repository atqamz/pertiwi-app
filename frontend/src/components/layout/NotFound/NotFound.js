import "./NotFound.css";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Fragment>
      <div className='notFoundPage'>
        <Link to='/' className='notFoundHeader'>
          <img src='/logo.png' alt='Pertiwi Logo' />
          <img src='/logotext.png' alt='Pertiwi Logo Text' />
        </Link>
        <div className='notFoundLeaf'>
          <img src='/assets/notFound/leftLeaf.png' alt='Leaf' />
          <img src='/assets/notFound/rightLeaf.png' alt='Leaf' />
        </div>
        <div className='notFoundContainer'>
          <h1>Oops!</h1>
          <h2>Something Went Wrong</h2>
          <p>404, Page Not Found</p>

          <img src='/assets/notFound/notFoundBg.png' alt='Page Not Found' />
        </div>
      </div>
    </Fragment>
  );
};

export default NotFound;
