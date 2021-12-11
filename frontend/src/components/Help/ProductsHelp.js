import "./Help.css";
import React, { Fragment } from "react";

const ProductsHelp = () => {
  return (
    <Fragment>
      <div className='helpPage'>
        <div className='helpContainer'>
          <h2>Help</h2>
          <h1>Products</h1>
          <div className='helpSection'>
            <ul>
              <li>Is that true, Pertiwi Pads are 100% Biodegradable?</li>
              <li>
                Yes, it’s true! We provide eco-friendly disposable sanitary napkins made
                from natural fibers and do not contain harmful ingredients. However,
                Pertiwi Pads can be 100% decomposed in soil without leaving any emission.
              </li>
            </ul>

            <hr />

            <ul>
              <li>
                Why disposable sanitary napkins? Is there another product that Pertiwi
                offers?
              </li>
              <li>
                Of course, there are several other period care products that are also
                environmentally friendly (such as tampons, menstrual cups, menstrual
                discs, etc.) so we offer comfort and safety for you because the most
                important thing is your comfort :) Feel free to contact us through email
                to request a product you want us to provide.
              </li>
            </ul>

            <hr />

            <ul>
              <li>This is how you treat your Pertiwi Pads.</li>
              <li>
                Save it in a dry place and avoid moisture build-up. However the box is
                enough to protect your pad in the bathroom while you have a period. But it
                is better to be prevented, isn't it? {"<3"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsHelp;
