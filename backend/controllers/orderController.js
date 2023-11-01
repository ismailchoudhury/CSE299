const express = require("express");
const Order = require("../models/orderModel");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.product");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getOrderByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userOrders = await Order.find({ userId }).populate(
      "products.product"
    ); // Populate the 'product' field with product details
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
  try {
    const orderData = req.body;
    const userId = req.user._id;
    orderData.userId = userId;

    const order = await Order.create(orderData);
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating order" });
  }
};

module.exports = { getAllOrders, getOrderByUserId, createOrder };
