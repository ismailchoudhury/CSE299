const mongoose = require("mongoose");

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
  imgURLs: {
    type: [String], // Store multiple image URLs in an array
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  // Add more fields as needed
});
productSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);
