import "./ProductDetail.css";
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../_actions/productAction";
import { addToCart } from "../../_actions/cartAction";

import Loading from "../layout/Loading/Loading";

const ProductDetail = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.productState);
  const { user } = useSelector((state) => state.userState);

  useEffect(() => {
    if (!product || (product && product._id !== match.params.productId)) {
      dispatch(getProduct(match.params.productId));
    } else {
      setProductType(product.productTypes[0]);

      if (user && user.role === "admin") {
        return;
      }
      axios.put(`/api/admin/product/${match.params.productId}`, {
        views: product.views + 1,
      });
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert, match.params.productId, product, user]);

  const [productType, setProductType] = useState({});
  const [quantity, setQuantity] = useState(1);

  const handleProductTypeChange = (e) => {
    setProductType(product.productTypes.find((type) => type.typeName === e.target.value));
    setQuantity(1);
  };

  const increaseQty = () => {
    if (productType.stock <= quantity) return;
    setQuantity(quantity + 1);
  };
  const decreaseQty = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(match.params.productId, productType, quantity));
    alert.success("Item Added to Cart!");
  };

  const [expanded, setExpanded] = useState(false);
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let imagesIndicator = [];
  product &&
    product.images.forEach((image, index) => {
      imagesIndicator.push(<img src={image.url} alt={`Preview ${index}`} />);
    });

  return (
    <Fragment>
      {loading || !product ? (
        <Loading />
      ) : (
        <Fragment>
          <div className='productDetailPage'>
            <Carousel
              autoPlay={false}
              IndicatorIcon={imagesIndicator}
              indicatorIconButtonProps={{ className: "imagesIndicator" }}
              navButtonsAlwaysInvisible={true}
              className='productDetailSlider'
            >
              {product.images.map((image, index) => (
                <img key={index} src={image.url} alt={`Preview ${index}`} />
              ))}
            </Carousel>

            <div className='productDetail'>
              <h1>{product.name}</h1>
              <h2>
                {Number(productType.price).toLocaleString("en-US", {
                  style: "currency",
                  currency: "IDR",
                })}
              </h2>
              <div className='productInteract'>
                <div>
                  <label htmlFor='type-select'>Select Type</label>
                  <select
                    id='type-select'
                    value={productType.name}
                    onChange={handleProductTypeChange}
                  >
                    {product.productTypes.map((type) => (
                      <option value={type.typeName}>{type.typeName}</option>
                    ))}
                  </select>
                </div>
                <div className='productQty'>
                  <IconButton onClick={decreaseQty}>
                    <Remove />
                  </IconButton>
                  <input readOnly type='number' value={quantity} />
                  <IconButton onClick={increaseQty}>
                    <Add />
                  </IconButton>
                </div>
              </div>

              <div>
                <Button
                  className='addToCartBtn'
                  disabled={productType.stock < 1 ? true : false}
                  onClick={handleAddToCart}
                >
                  + Add To Cart
                </Button>
              </div>

              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleAccordionChange("panel1")}
                className='productAccordion'
              >
                <AccordionSummary
                  expandIcon={expanded === "panel1" ? <Remove /> : <Add />}
                  aria-controls='panel1bh-content'
                  id='panel1bh-header'
                >
                  <Typography
                    sx={{
                      flexShrink: 0,
                      fontFamily: "Oswald",
                      fontWeight: "600",
                      fontSize: "2rem",
                      letterSpacing: "0.04em",
                      textTransform: "capitalize",
                      color: "#1A1A1A",
                    }}
                  >
                    Details
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className='multiline'>{product.description}</Typography>
                </AccordionDetails>
              </Accordion>

              <hr />

              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleAccordionChange("panel2")}
                className='productAccordion'
              >
                <AccordionSummary
                  expandIcon={expanded === "panel2" ? <Remove /> : <Add />}
                  aria-controls='panel2bh-content'
                  id='panel2bh-header'
                >
                  <Typography
                    sx={{
                      flexShrink: 0,
                      fontFamily: "Oswald",
                      fontWeight: "600",
                      fontSize: "2rem",
                      letterSpacing: "0.04em",
                      textTransform: "capitalize",
                      color: "#1A1A1A",
                    }}
                  >
                    Ingredients
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className='multiline'>{product.ingredient}</Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetail;
