const express = require("express");
const {
  getAllOrders,
  getOrderByUserId,
  getOrdersBySellerId,
  createOrder,
} = require("../controllers/orderController");
// const router = require("./user");

const router = express.Router();

router.get("/", getAllOrders);
router.post("/createOrder", createOrder);
router.get("/:userId", getOrderByUserId);
router.get("/getOrdersBySellerId/:sellerId", getOrdersBySellerId);

module.exports = router;
