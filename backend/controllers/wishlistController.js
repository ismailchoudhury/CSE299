const Wishlist = require("../models/Wishlist");

// Create a new wishlist
const createWishlist = async (req, res) => {
  try {
    const wishlist = new Wishlist(req.body);
    await wishlist.save();
    res.status(201).json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create wishlist" });
  }
};

// Get a user's wishlist
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.status(200).json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve wishlist" });
  }
};

// Add a product to the wishlist
const addToWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // Assuming req.body.productId is the product to add
    wishlist.products.push({ product: req.body.productId });

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product to wishlist" });
  }
};

// Remove a product from the wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // Assuming req.params.productId is the product to remove
    wishlist.products = wishlist.products.filter(
      item => item.product.toString() !== req.params.productId
    );

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove product from wishlist" });
  }
};

module.exports = {
  createWishlist,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
