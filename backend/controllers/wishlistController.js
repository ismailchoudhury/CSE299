const Wishlist = require("../models/wishlist");
const Product = require("../models/product");

const User = require("../models/userModel");

const getWishlist = async (req, res) => {
  const userId = req.params.userId;
  try {
    const userWishlist = await Wishlist.find({ user: userId });

    if (!userWishlist) {
      return res
        .status(404)
        .json({ message: "Wishlist not found for the user." });
    }

    // Fetch product details for each wishlist item
    const wishlistWithProductDetails = await Promise.all(
      userWishlist.map(async item => {
        const product = await Product.findById(item.product);

        if (product) {
          // Include product details in the item
          return {
            ...item.toObject(),
            product: product.toObject(),
          };
        } else {
          return item;
        }
      })
    );

    return res.status(200).json({ userWishlist: wishlistWithProductDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById({ _id: userId });
    const product = await Product.findById({ _id: productId });

    if (!user || !product) {
      console.log("here");
      return res.status(404).json({ message: "User or product not found." });
    }

    const wishlistItem = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    if (wishlistItem) {
      return res.json({ message: "Product is already in the wishlist." });
    }

    const newWishlistItem = new Wishlist({
      user: userId,
      product: productId,
    });

    await newWishlistItem.save();

    return res
      .status(200)
      .json({ message: "Product added to the wishlist successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const wishlistItem = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    if (!wishlistItem) {
      return res.status(404).json({ message: "Wishlist item not found." });
    }

    await wishlistItem.remove();

    return res.status(200).json({ message: "Product removed from wishlist." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
