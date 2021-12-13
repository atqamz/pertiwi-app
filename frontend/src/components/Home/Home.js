import "./Home.css";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Button, IconButton } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, adminGetAllProducts } from "../../_actions/productAction";

import Loading from "../layout/Loading/Loading";

const ProductCard = ({ product }) => {
  const history = useHistory();

  let min = product && Math.min(...product.productTypes.map((item) => item.price));
  let lowestPrice = product && product.productTypes.filter((item) => item.price === min);

  return (
    <div key={product && product._id} className='productCardHome'>
      <img
        src={product && product.images[0].url}
        alt={`Product ${product && product._id}`}
      />
      <h2>{product && product.name}</h2>
      <p>
        Start From{" "}
        {lowestPrice &&
          lowestPrice[0].price.toLocaleString("en-US", {
            style: "currency",
            currency: "IDR",
          })}
      </p>

      <Button
        className='goToProductBtn'
        onClick={() => history.push(`/product/${product && product._id}`)}
      >
        Shop Now
      </Button>
    </div>
  );
};

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.allProductsState);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(adminGetAllProducts());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading || !products ? (
        <Loading />
      ) : (
        <Fragment>
          <div className='sectionOnePage'>
            <img src='/assets/homePage/homepagesection1.png' alt='Pertiwi Bg 1' />
            <div className='sectionOneContainer'>
              <div className='sectionOneHeader'>
                <h1>
                  FOR EARTH <br /> BETTER FUTURE
                </h1>
                <p>Nyaman digunakan dan ramah lingkungan</p>
              </div>
              <div className='sectionOneCTA'>
                <a href='#2'>Shop Now</a>
              </div>
            </div>

            <div className='sectionOneValue'>
              <div className='sectionOneValueContainer'>
                <h1>Value of Pertiwi</h1>

                <div>
                  <div className='valueInfo'>
                    <img src='/assets/homePage/value1.png' alt='Pertiwi Value 1' />
                    <p>
                      Free from harmful <br /> chemical
                    </p>
                  </div>
                  <div className='valueInfo'>
                    <img src='/assets/homePage/value2.png' alt='Pertiwi Value 2' />
                    <p>Comfortable</p>
                  </div>
                  <div className='valueInfo'>
                    <img src='/assets/homePage/value3.png' alt='Pertiwi Value 3' />
                    <p>
                      Decomposed 100% in soil <br /> including the plastic
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='sectionTwoPage' id='2'>
            <img src='/assets/homePage/homepagesection2.png' alt='Pertiwi Bg 2' />

            <div className='sectionTwoContainer'>
              <div className='sectionTwoCTA'>
                <h1>Pertiwi Pads</h1>
                <p>
                  Pertiwi is an environmentally friendly sanitary napkin made from natural
                  fiber and betel leaf extract with high absorption so it makes it more
                  comfortable, and free of harmful chemicals
                </p>

                <div className='sectionTwoBtn'>
                  <Link to='/product'>See All Products</Link>

                  <div>
                    <IconButton>
                      <ChevronRight />
                    </IconButton>
                  </div>
                </div>
              </div>
              {products.length > 0 && (
                <div className='sectionTwoProductPreview'>
                  {products && (
                    <ProductCard
                      product={products[Math.floor(Math.random() * products.length)]}
                    />
                  )}
                  {products && (
                    <ProductCard
                      product={products[Math.floor(Math.random() * products.length)]}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          <div className='sectionThreePage'>
            <img src='/assets/homePage/homepagesection3.png' alt='Pertiwi Bg 3' />
            <div className='sectionThreeContainer'>
              <h1>Let's bring the impact with Pertiwi</h1>
              <p>
                Pertiwi want to be a big step in business waste handling plastic in
                Indonesia, and want <br /> to improve women's welfare
              </p>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
