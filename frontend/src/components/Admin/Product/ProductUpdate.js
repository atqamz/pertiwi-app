import React, { Fragment, useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProduct,
  adminUpdateProduct,
} from "../../../_actions/productAction";
import { ADMIN_UPDATE_PRODUCT_RESET } from "../../../_constants/productConstant";

const ProductUpdate = ({ match, history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector((state) => state.productState);
  const { error: adminError, isUpdated } = useSelector(
    (state) => state.adminProductState
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [productTypes, setProductTypes] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const productId = match.params.productId;
  useEffect(() => {
    if (!product || (product && product._id !== productId)) {
      dispatch(getProduct(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setIngredient(product.ingredient);
      setProductTypes(product.productTypes);
      setOldImages(product.images);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (adminError) {
      alert.error(adminError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      dispatch({ type: ADMIN_UPDATE_PRODUCT_RESET });
      history.push("/admin/products");
      alert.success("Product Updated!");
      history.go(0);
    }
  }, [dispatch, error, adminError, alert, isUpdated, history, product, productId]);

  const handleProductTypesChange = (e, index) => {
    const values = [...productTypes];
    values[index][e.target.name] = e.target.value;
    setProductTypes(values);
  };

  const handleProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
          setImagesPreview((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();

    form.set("name", name);
    form.set("description", description);
    form.set("ingredient", ingredient);
    form.set("productTypes", JSON.stringify(productTypes));

    images.forEach((image) => {
      form.append("images", image);
    });

    dispatch(adminUpdateProduct(productId, form));
  };

  const handleRemoveImage = (index) => {
    let values;

    values = [...images];
    values.splice(index, 1);
    setImages(values);

    values = [...imagesPreview];
    values.splice(index, 1);
    setImagesPreview(values);
  };

  const addProductType = (index) => {
    const values = [...productTypes];

    values.splice(index + 1, 0, {
      typeName: "",
      price: 0,
      stock: 0,
    });
    setProductTypes(values);
  };
  const removeProductType = (index) => {
    const values = [...productTypes];

    if (values.length <= 1) {
      values.splice(index, 1, {
        typeName: "",
        price: 0,
        stock: 0,
      });
    } else {
      values.splice(index, 1);
    }

    setProductTypes(values);
  };
  return (
    <Fragment>
      <div className='dashboardContainer'>
        <h1>Update Product</h1>
        <div
          className='productsTabPanel'
          role='tabpanel'
          id='tabpanel-1'
          aria-labelledby='tab-1'
        >
          <form
            className='addProductForm'
            onSubmit={handleFormSubmit}
            encType='application/json'
          >
            <div>
              <div className='productFormLeft'>
                <div className='productFormInput'>
                  <label htmlFor='productName'>Product Name</label>
                  <input
                    type='text'
                    name='name'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='productFormInput'>
                  <label htmlFor='productDescription'>Description</label>
                  <textarea
                    type='text'
                    name='description'
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className='productFormInput'>
                  <label htmlFor='productIngredient'>Ingredient</label>
                  <textarea
                    type='text'
                    name='ingredient'
                    required
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                  />
                </div>
                <Button
                  className='addProductBtn'
                  type='submit'
                  disabled={loading ? true : false}
                >
                  Update Product
                </Button>
              </div>

              <div className='productFormRight'>
                <div className='productImages'>
                  <div className='productFormFile'>
                    <input
                      type='file'
                      name='images'
                      accept='image/*'
                      multiple
                      onChange={handleProductImagesChange}
                    />
                  </div>
                  {oldImages && oldImages.length > 0 && (
                    <>
                      <p>Old Images</p>
                      <div className='productImagesPreview'>
                        {oldImages.map((image, index) => (
                          <img
                            key={index}
                            alt={`Product Preview ${index}`}
                            src={image.url}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  {imagesPreview && imagesPreview.length > 0 && (
                    <>
                      <p>Click image to delete</p>
                      <div className='productImagesPreview'>
                        {imagesPreview.map((image, index) => (
                          <img
                            key={index}
                            alt={`Product Preview ${index}`}
                            src={image}
                            onClick={() => handleRemoveImage(index)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {productTypes.map((type, index) => (
                  <div className='productTypes' key={index}>
                    <div className='productFormInput'>
                      <label htmlFor='typeName'>Type</label>
                      <input
                        type='text'
                        name='typeName'
                        required
                        value={type.typeName}
                        onChange={(e) => handleProductTypesChange(e, index)}
                      />
                    </div>
                    <div className='productFormInput'>
                      <label htmlFor='price'>Price</label>
                      <input
                        type='number'
                        name='price'
                        required
                        value={type.price === 0 ? "" : type.price}
                        onChange={(e) => handleProductTypesChange(e, index)}
                      />
                    </div>
                    <div className='productFormInput'>
                      <label htmlFor='stock'>Stock</label>
                      <input
                        type='number'
                        name='stock'
                        required
                        value={type.stock === 0 ? "" : type.stock}
                        onChange={(e) => handleProductTypesChange(e, index)}
                      />
                    </div>
                    <div>
                      <IconButton onClick={() => addProductType(index)}>
                        <Add />
                      </IconButton>
                      <IconButton onClick={() => removeProductType(index)}>
                        <Remove />
                      </IconButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductUpdate;
