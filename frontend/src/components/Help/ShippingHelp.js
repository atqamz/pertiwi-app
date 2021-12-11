import "./Help.css";
import React, { Fragment } from "react";

const ShippingHelp = () => {
  return (
    <Fragment>
      <div className='helpPage'>
        <div className='helpContainer'>
          <h2>Help</h2>
          <h1>Shipping</h1>
          <div className='helpSection shipping'>
            <div className='helpSectionHeader'>
              <h1>Product Return</h1>
            </div>
            <h3>Pertiwi Indonesia Return and Refund Policies</h3>
            <ul>
              <li>
                Product return period through online purchases (with delivery methods via
                courier and Click & Collect) only valid for a maximum of 30 (thirty) days
                from the date of purchase. The date of purchase (order) is counted as the
                first day. Example 1: For purchases (orders) on May 01 can only be
                accepted until May 30. Example 2: For purchases (orders) on May 05 can
                only be accepted until June 03.
              </li>
            </ul>

            <hr />

            <ul>
              <li>
                Terms of returning Products through online purchases (by courier delivery
                methods and Click & Collect) are in new, unused condition and still have
                the original price tag and label.
              </li>
            </ul>

            <hr />

            <ul className='productReturnTerm'>
              <li>Product that can’t be returned:</li>
              <div>
                <p>
                  <img src='/assets/helpPage/helpdate.png' alt='Help Date' />
                  More than 30 days from <br /> the date of purchase
                </p>
                <p>
                  <img src='/assets/helpPage/helpreceipt.png' alt='Help Date' />
                  Without a purchase receipt <br /> or return form
                </p>
                <p>
                  <img src='/assets/helpPage/helppricetag.png' alt='Help Date' />
                  Without the original <br /> price tag and label
                </p>
              </div>
              <div>
                <p>
                  <img src='/assets/helpPage/helpwoman.png' alt='Help Date' />
                  Product has been used
                </p>
                <p>
                  <img src='/assets/helpPage/helpcondition.png' alt='Help Date' />
                  Condition of the product is not in <br /> accordance with the time of
                  <br /> purchase (damaged)
                </p>
              </div>
            </ul>

            <hr />

            <ul>
              <li>
                The refund period will be made within 7 to 14 days from the time the
                warehouse receives and verifies the returned Product and provides an email
                notification to your email.
              </li>
            </ul>

            <hr />

            <ul>
              <li>
                Funds will be refunded based on your previous payment type. For the
                Virtual account method and COD payment, please fill out and submit the
                link form that you find in the email notification you receive. Our
                Customer Support will contact you if there is a further process.
              </li>
            </ul>

            <hr />

            <ul>
              <li>
                The amount refunded is only based on the total price of the Product that
                you paid even though the promotion of the Product has ended.
              </li>
            </ul>

            <hr />

            <ul>
              <li>
                Shipping fees paid and coupons used when ordering are non-refundable.
              </li>
            </ul>

            <hr />

            <ul>
              <li>
                Pertiwi reserves the right to refuse a return if the Product does not meet
                the requirements of the above return policy.
              </li>
            </ul>

            <hr />

            <ul>
              <li>Pertiwi has the right to change this policy at any time.</li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShippingHelp;
