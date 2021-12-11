const User = require("../models/userModel");
const catchAsyncError = require("./catch");
const ErrorHandler = require("../utils/errorhandler");
const jwt = require("jsonwebtoken");

exports.isAuth = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource.", 401));
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodeData.id);
  next();
});

exports.authRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler("Access denied.", 403));
    }

    next();
  };
};
