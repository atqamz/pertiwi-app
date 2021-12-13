import "./Footer.css";
import React, { Fragment } from "react";
import { Mail, Instagram, Copyright } from "@mui/icons-material";

const Footer = () => {
  return (
    <Fragment>
      <div className='footer'>
        <div className='upperFooter'>
          <h1>With Pertiwi :</h1>
          <ul>
            <li>Support Local Farmer</li>
            <li>
              Good for The Soil Because It Is 100% Biodegrable and Leaves no Emission
            </li>
          </ul>
        </div>
        <div className='lowerFooter'>
          <div>
            <h2>Contact</h2>
            <p>
              <Mail />
              pertiwipads.official@gmail.com
            </p>
            <p>
              <Instagram />
              @pertiwicare
            </p>
          </div>

          <div>
            <div className='footerLogo'>
              <img src='/logo.png' alt='Pertiwi Logo' />
              <img src='/logotext.png' alt='Pertiwi Logo Text' />
            </div>
            <p>Let's bring the impact!</p>
          </div>

          <div>
            <h2>Payment Method</h2>
            <div className='paymentMethod'></div>
          </div>
        </div>
      </div>
      <div className='copyrightFooter'>
        <p>
          <Copyright /> Copyright 2021 Pertiwi, All rights reserved.
        </p>
      </div>
    </Fragment>
  );
};

export default Footer;
