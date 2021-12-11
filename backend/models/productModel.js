const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Enter product name!"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Enter product description!"],
    },
    ingredient: {
      type: String,
      required: [true, "Enter product ingredient!"],
    },
    productTypes: [
      {
        typeName: {
          type: String,
          required: [true, "Enter product type name!"],
        },
        price: {
          type: Number,
          required: [true, "Enter product type price!"],
        },
        stock: {
          type: Number,
          required: [true, "Enter product type stock!"],
          maxlength: 4,
          default: 1,
        },
      },
    ],
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],

    views: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
