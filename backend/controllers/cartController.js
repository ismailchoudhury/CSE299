const Cart = require("../models/cartModel");
const Product = require("../models/product");

const User = require("../models/userModel");
const getCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userCart = await Cart.find({ user: userId }).populate("product");

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found for the user." });
    }

    return res.status(200).json({ userCart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById({ _id: userId });
    const product = await Product.findById({ _id: productId });

    if (!user || !product) {
      return res.status(404).json({ message: "User or product not found." });
    }

    let cartItem = await Cart.findOne({ user: userId, product: productId });

    if (!cartItem) {
      cartItem = new Cart({
        user: userId,
        product: productId,
        quantity: 1,
      });
    } else {
      const newQuantity = cartItem.quantity + 1;

      if (newQuantity > product.stock) {
        return res
          .status(400)
          .json({ message: "Quantity exceeds product stock." });
      }
      cartItem.quantity = newQuantity;
    }

    await cartItem.save();
    return res
      .status(200)
      .json({ message: "Product added to cart successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cartItem = await Cart.findOne({ user: userId, product: productId });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    cartItem.quantity -= 1;

    if (cartItem.quantity <= 0) {
      await cartItem.remove();
      return res.status(200).json({ message: "Product removed from cart." });
    }

    await cartItem.save();

    return res
      .status(200)
      .json({ message: "Quantity decremented in the cart." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
};