const express = require("express");

// Import your product controller and middleware functions here
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { verifySeller } = require("../controllers/userController");
const router = express.Router();

// Create a new product (only for verified sellers)
router.post("/createproduct", createProduct);

// Get a list of all products (for clients and admin)
router.get("/", getAllProducts);

// Get a single product by ID (for clients and admin)
router.get("/id", getProductById);

// Update a product by ID (only for the seller of the product)
router.patch("/id", updateProduct);

// Delete a product by ID (only for the seller of the product)
router.delete("/id", deleteProduct);

module.exports = router;