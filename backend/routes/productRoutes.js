const express = require("express");

// Import your product controller and middleware functions here
const {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsBySeller,
  updateProduct,
  deleteProduct,
  searchProducts,
  getAllCategories,
  getProductsByCategory,
} = require("../controllers/productController");
const { verifySeller } = require("../controllers/userController");
const router = express.Router();

router.post("/createproduct", createProduct); // Create a new product (only for verified sellers)

router.get("/", getAllProducts); // Get a list of all products (for clients and admin)

router.get("/getProductById/:productId", getProductById); // Get a single product by ID (for clients and admin)

router.get("/getProductBySeller/:sellerId", getProductsBySeller); // Get a single product by Selelr ID (for seller)

router.put("/:id", updateProduct); // Update a product by ID (only for the seller of the product)

router.delete("/", deleteProduct); // Delete a product by ID (only for the seller of the product)

router.get("/search", searchProducts);

router.get("/categories", getAllCategories);

router.get("/category/:category", getProductsByCategory);
module.exports = router;
