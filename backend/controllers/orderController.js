const express = require("express");
const Order = require("../models/orderModel");
const Product = require("../models/product");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
// const { getCart } = require("../controllers/cartController");
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("carts");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getOrderByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userOrders = await Order.find({ userId }).populate("carts");
    if (!userOrders || userOrders.length === 0) {
      return res.status(404).json({ error: "No orders found for the user" });
    }
    res.json(userOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching user orders" });
  }
};
const getOrdersBySellerId = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    // Step 1: Find products associated with the seller
    const sellerProducts = await Product.find({ seller: sellerId });

    // Step 2: Extract the product IDs
    const productIds = sellerProducts.map(product => product._id);

    // Step 3: Find orders that contain these products
    const sellerOrders = await Order.find({
      "carts.product": { $in: productIds },
    }).populate("carts.product");

    if (!sellerOrders || sellerOrders.length === 0) {
      return res.status(404).json({ error: "No orders found for the seller" });
    }

    res.json(sellerOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching seller orders" });
  }
};
const createOrder = async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch the user's cart items
    const userCart = await Cart.find({ user: user }).populate("product");

    if (userCart.length === 0) {
      return res.status(400).json({ error: "User's cart is empty" });
    }

    // Create the order using the user's cart items
    const orderItems = userCart.map(async cartItem => {
      const product = cartItem.product;
      const quantity = cartItem.quantity;

      if (quantity > product.stock) {
        return res.status(400).json({
          error: `Quantity of ${product.name} exceeds product stock.`,
        });
      }

      // Update the stock of the product
      product.stock -= quantity;
      await product.save();

      return {
        product: product,
        quantity: quantity,
      };
    });

    const orderItemsPromises = await Promise.all(orderItems);

    // Check if any order item failed due to stock limitations
    if (orderItemsPromises.some(item => item instanceof Error)) {
      return;
    }

    const order = new Order({
      userId: user._id,
      carts: orderItemsPromises,
    });

    await order.save();

    return res.status(201).json({
      code: 200,
      message: "Successfully placed the order",
      orderId: order._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderByUserId,
  getOrdersBySellerId,
  createOrder,
};
