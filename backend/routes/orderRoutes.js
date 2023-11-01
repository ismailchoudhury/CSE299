const express = require("express");
const {
  getAllOrders,
  getOrderByUserId,
  createOrder,
} = require("../controllers/orderController");
const router = require("./user");

router.get("/orders", getAllOrders);
router.get("orders/:userId", getOrderByUserId);
router.post("/orders", createOrder);

module.exports = router;
