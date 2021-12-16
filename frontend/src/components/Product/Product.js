import "./Product.css";
import React, { Fragment, useEffect } from "react";
import Slider from "react-slick";
import { Button } from "@mui/material";
import { useAlert } from "react-alert";
import { useHistory } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, adminGetAllProducts } from "../../_actions/productAction";

import Loading from "../layout/Loading/Loading";

const ProductCard = ({ product }) => {
  const history = useHistory();

  let min = Math.min(...product.productTypes.map((item) => item.price));
  let lowestPrice = product.productTypes.filter((item) => item.price === min);

  return (
    <div key={product._id} className='productSliderContent'>
      <div className='productCard'>
        <img src={product.images[0].url} alt={`Product ${product._id}`} />
        <h2>{product.name}</h2>
        <p>
          Start From{" "}
          {lowestPrice[0].price.toLocaleString("en-US", {
            style: "currency",
            currency: "IDR",
          })}
        </p>

        <Button
          className='goToProductBtn'
          onClick={() => history.push(`/product/${product._id}`)}
        >
          Shop Now
        </Button>
      </div>
    </div>
  );
};

const Product = () => {
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

  const settings = {
    className: "productSlider",
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className='productPage'>
            <div className='productContainer'>
              <h1>Our Products</h1>
              <Slider {...settings}>
                {products && products.map((product) => <ProductCard product={product} />)}
              </Slider>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Product;
