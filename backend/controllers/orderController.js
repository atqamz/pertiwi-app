const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const catchAsyncError = require("../middlewares/catch");
const ErrorHandler = require("../utils/errorhandler");

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

// Create Order
exports.createOrder = catchAsyncError(async (req, res, next) => {
  const { shippingInfo, orderItems, itemsPrice, taxPrice, shippingPrice, totalPrice } =
    req.body;

  await Order.create({
    shippingInfo,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
  });
});

// Get My Orders
exports.getMyOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  if (!orders) {
    return next(new ErrorHandler("Orders not found.", 404));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get Order
exports.getOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId).populate("user", "name email");

  if (!order) {
    return next(new ErrorHandler("Order not found.", 404));
  }

  res.status(200).json({
    success: true,
    order,
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

// Get All Orders -- Admin
exports.adminGetAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//  Get Order by User ID -- Admin
exports.adminGetOrderByUser = catchAsyncError(async (req, res, next) => {
  const order = await Order.findOne({ user: req.params.userId });

  res.status(200).json({
    success: true,
    order,
  });
});

// Update Order Status -- Admin
exports.adminUpdateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);

  if (!order) {
    return next(new ErrorHandler("Order not found.", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("This order has already been delivered.", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (item) => {
      await updateStock(item.product, item.productType, item.quantity);
    });
  }

  order.orderStatus = req.body.status;

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(productId, productTypeId, quantity) {
  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  product.productTypes.forEach((type) => {
    if (productTypeId === type.id) {
      type.stock -= quantity;
    }
  });

  product.save({ validateBeforeSave: false });
}

// Delete Order -- Admin
exports.adminDeleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);

  if (!order) {
    return next(new ErrorHandler("Order not found.", 404));
  }

  await order.remove();
  res.status(200).json({
    success: true,
    message: "Order deleted.",
  });
});
