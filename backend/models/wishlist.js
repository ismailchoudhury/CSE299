const mongoose = require("mongoose");

// Create a schema for the Wishlist
const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // You may have a User model for authentication
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // You may have a Product model for your e-commerce products
        required: true,
      },
    },
  ],
});

// Create a Wishlist model using the schema
module.exports = mongoose.model("Wishlist", wishlistSchema);
