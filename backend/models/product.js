const mongoose = require("mongoose");
const { sellerId } = require("./sellerModel");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller", // Referencing the "Seller" model
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  // Add more fields as needed
});

module.exports = mongoose.model("Product", productSchema);
