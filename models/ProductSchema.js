const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
       Brand: {
      type: String,
      required: true,
    },
    BrandType: {
        type: String,
        required: true,
        lowercase: true,
      },
    description: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      required: true,
    },
    // price: {
    //   type: Number,
    //   required: true,
    // },
    originalPrice: {
      type: Number,
      required: true,
    },
    // originalquantity: {
    //   type: Number,
    //   required: true,
    // },
    quantity: {
      type: Number,
      required: true,
    },

    // quality: {
    //   type: Number,
    //   required: true,
    // },
    // createdBy: {
    //   type: String,
    //   required: true,
    // },

    // category: {
    //   type: String,
    //   required: true,
    // },
    Status:{
        type:Number,
        required:true
    },
    images: [
      {
        name: {
          type: String,
        },
      },
    ],
    reviews: [
      {
        userid: { type: String },
        userReview: { type: String },
      },
    ],
  },
  { timestamps: true }
);
const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
