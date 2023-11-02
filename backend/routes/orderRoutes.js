const express = require("express");
const {
  getAllOrders,
  getOrderByUserId,
  createOrder,
} = require("../controllers/orderController");
// const router = require("./user");

const router = express.Router();

router.get("/", getAllOrders);
router.post("/createOrder", createOrder);
router.get("/:userId", getOrderByUserId);

module.exports = router;
