import "./Footer.css";
import React, { Fragment } from "react";
import { Mail, Chat, Instagram, Copyright } from "@mui/icons-material";

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
              <Chat />
              +62 812 0000 0000
            </p>
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
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>

          <div>
            <h2>Payment Method</h2>
            <div className='paymentMethod'></div>
          </div>
        </div>
      </div>
      <div className='copyrightFooter'>
        <p>
          <Copyright /> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </Fragment>
  );
};

export default Footer;
