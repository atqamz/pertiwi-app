const fs = require("fs");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

const User = require("../models/userModel");
const catchAsyncError = require("../middlewares/catch");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendemail");

//
//
//
//
//
//
//
//
//
// ========= Auth

// === Register User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password doesn't match.", 400));
  }

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  req.body.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  const user = await User.create(req.body);

  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter e-mail and password.", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid e-mail or password.", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid e-mail or password.", 401));
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({ success: true, message: "Logged out." });
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
// ========= Public

// Get User Profile
exports.getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({ success: true, user });
});

// Update User
exports.updateUser = catchAsyncError(async (req, res, next) => {
  if (req.body.avatar) {
    const user = await User.findById(req.user._id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 250,
      crop: "scale",
    });

    req.body.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true });
});

// Update User Password
exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  const user = await User.findById(req.user._id).select("+password");

  const isPasswordMatched = await user.comparePassword(oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (newPassword !== confirmNewPassword) {
    return next(new ErrorHandler("New password doesn't match.", 400));
  }

  user.password = newPassword;

  await user.save();

  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({ success: true });
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

// Get All Users -- Admin
exports.adminGetAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({ success: true, users });
});

// Get User -- Admin
exports.adminGetUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  res.status(200).json({ success: true, user });
});

// Update User -- Admin
exports.adminUpdateUser = catchAsyncError(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true });
});

// Delete User -- Admin
exports.adminDeleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();
  res.status(200).json({ success: true, message: "User deleted." });
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
// ========= Forgot Password

// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  // Get resetPasswordToken
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${process.env.FRONTEND_URI}/password/reset/${resetToken}`;
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/${resetToken}`;

  const message = `Your password reset token is: \n\n${resetPasswordUrl}\n\n If you have not requested this mail then, please ignore it!`;

  try {
    await sendEmail({ email: user.email, subject: `Account Password Recovery`, message });

    res.status(200).json({
      success: true,
      message: `E-mail has been sent to ${user.email}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // Creating hash token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset Password Token is invalid or has been expired.", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password doesn't match.", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({ validateBeforeSave: false });

  sendToken(user, 200, res);
});
