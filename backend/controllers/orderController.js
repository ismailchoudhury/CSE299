const express = require("express");
const Order = require("../models/orderModel");
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
    console.log(userCart);

    // Extract the cart items into an array for the order
    const orderItems = userCart.map(cartItem => ({
      product: cartItem.product,
      quantity: cartItem.quantity,
    }));

    // Create the order using the user's cart items
    const order = new Order({
      userId: user._id,
      carts: orderItems,
    });

    console.log(order);

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

module.exports = { getAllOrders, getOrderByUserId, createOrder };
