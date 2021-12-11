import "./ProductList.css";
import React, { Fragment, useEffect, useState } from "react";
import { Tabs, Tab, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit, Remove, Add } from "@mui/icons-material";
import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  adminGetAllProducts,
  adminAddProduct,
  adminDeleteProduct,
} from "../../../_actions/productAction";
import {
  ADMIN_ADD_PRODUCT_RESET,
  ADMIN_DELETE_PRODUCT_RESET,
} from "../../../_constants/productConstant";

import Loading from "../../layout/Loading/Loading";

const ProductList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.allProductsState);
  const {
    error: adminError,
    isAdded,
    isDeleted,
  } = useSelector((state) => state.adminProductState);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (adminError) {
      alert.error(adminError);
      dispatch(clearErrors());
    }

    if (isAdded) {
      alert.success("Product Added!");
      history.go(0);
      dispatch({ type: ADMIN_ADD_PRODUCT_RESET });
    }

    if (isDeleted) {
      alert.success("Product Deleted!");
      history.push("/admin/products");
      dispatch({ type: ADMIN_DELETE_PRODUCT_RESET });
    }

    dispatch(adminGetAllProducts());
  }, [dispatch, error, adminError, alert, isAdded, isDeleted, history]);

  const [value, setValue] = useState(0);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    ingredient: "",
  });
  const [productTypes, setProductTypes] = useState([
    {
      typeName: "",
      price: 0,
      stock: 0,
    },
  ]);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleProductUpdate = (productId) => {
    history.push(`/admin/product/${productId}`);
  };

  const handleProductDelete = (productId) => {
    dispatch(adminDeleteProduct(productId));
  };

  const handleFormChange = (e, index = null) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

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

    form.set("name", product.name);
    form.set("description", JSON.stringify(product.description));
    form.set("ingredient", JSON.stringify(product.ingredient));
    form.set("productTypes", JSON.stringify(productTypes));

    images.forEach((image) => {
      form.append("images", image);
    });

    dispatch(adminAddProduct(form));
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

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "Number",
      flex: 0.3,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "Number",
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <IconButton
              onClick={() => handleProductUpdate(params.getValue(params.id, "id"))}
            >
              <Edit />
            </IconButton>

            <IconButton
              onClick={() => handleProductDelete(params.getValue(params.id, "id"))}
            >
              <Delete />
            </IconButton>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((product) => {
      let totalStock = 0;
      product.productTypes.forEach((type) => {
        totalStock += type.stock;
      });
      rows.push({
        id: product._id,
        name: product.name,
        stock: totalStock,
      });
    });

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className='dashboardContainer'>
            <h1>Products</h1>

            <Tabs
              textColor='inherit'
              className='productsTab'
              value={value}
              onChange={handleTabChange}
              aria-label='basic tabs'
            >
              <Tab
                className='productsTabItem'
                label='Overview'
                id='tab-0'
                aria-controls='tabpanel-0'
              />
              <Tab
                className='productsTabItem'
                label='Add Product'
                id='tab-1'
                aria-controls='tabpanel-1'
              />
            </Tabs>

            <div
              className='productsTabPanel'
              role='tabpanel'
              hidden={value !== 0}
              id='tabpanel-0'
              aria-labelledby='tab-0'
            >
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className='productListTable'
                autoHeight
              />
            </div>

            <div
              className='productsTabPanel'
              role='tabpanel'
              hidden={value !== 1}
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
                        value={product.name}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className='productFormInput'>
                      <label htmlFor='productDescription'>Description</label>
                      <textarea
                        type='text'
                        name='description'
                        required
                        value={product.description}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className='productFormInput'>
                      <label htmlFor='productIngredient'>Ingredient</label>
                      <textarea
                        type='text'
                        name='ingredient'
                        required
                        value={product.ingredient}
                        onChange={handleFormChange}
                      />
                    </div>
                    <Button
                      className='addProductBtn'
                      type='submit'
                      disabled={loading ? true : false}
                    >
                      Add Product
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
                      {imagesPreview.length > 0 && <p>Click image to delete</p>}
                      <div className='productImagesPreview'>
                        {imagesPreview.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Product Preview ${index}`}
                            onClick={() => handleRemoveImage(index)}
                          />
                        ))}
                      </div>
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
      )}
    </Fragment>
  );
};

export default ProductList;
