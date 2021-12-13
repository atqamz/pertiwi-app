const cloudinary = require("cloudinary");

const Product = require("../models/productModel");
const catchAsyncError = require("../middlewares/catch");
const ErrorHandler = require("../utils/errorhandler");
const ApiFeature = require("../utils/apifeature");

//
//
//
//
//
//
//
//
//
// ========= Public

// Get All Product
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeature(Product.find(), req.query).search().filter();

  let filteredProductsCount = await apiFeature.query.length;

  apiFeature.pagination(resultPerPage);

  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    productsCount,
    resultPerPage,
    filteredProductsCount,
    products,
  });
});

// Get Product
exports.getProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//
//
//
//
//
//
//
//
//
// ========= Admin

// Get All Product -- Admin
exports.adminGetAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// Create Product -- Admin
exports.adminCreateProduct = catchAsyncError(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesAfter = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      timeout: 60000,
      folder: "products",
    });

    imagesAfter.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesAfter;
  req.body.user = req.user._id;
  // req.body.description = JSON.parse(req.body.description);
  // req.body.ingridient = JSON.parse(req.body.ingridient);
  req.body.productTypes = JSON.parse(req.body.productTypes);

  await Product.create(req.body);
  res.status(201).json({
    success: true,
  });
});

// Update Product -- Admin
exports.adminUpdateProduct = catchAsyncError(async (req, res, next) => {
  if (req.body.views) {
    await Product.findByIdAndUpdate(req.params.productId, req.body, {
      new: true,
      runValidator: false,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  }

  let product = await Product.findById(req.params.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesAfter = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        timeout: 60000,
        folder: "products",
      });

      imagesAfter.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesAfter;
  }

  req.body.user = req.user._id;
  req.body.productTypes = JSON.parse(req.body.productTypes);

  await Product.findByIdAndUpdate(req.params.productId, req.body, {
    new: true,
    runValidator: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete Product -- Admin
exports.adminDeleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product deleted.",
  });
});
