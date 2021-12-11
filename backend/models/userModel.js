const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Enter name!"],
      maxlength: [30, "Name cannot exceed 30 characters."],
      minlength: [4, "Name should have more than 4 characters."],
    },
    email: {
      type: String,
      required: [true, "Enter email!"],
      unique: true,
      validate: [validator.isEmail, "Enter valid email!"],
    },
    phone: {
      type: String,
      required: [true, "Enter phone number!"],
    },
    password: {
      type: String,
      select: false,
      required: [true, "Enter password!"],
      minlength: [8, "Password should have more than 8 characters."],
    },
    birthdate: { type: Date, required: true },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password).then((result) => result);
};

// Generate Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
