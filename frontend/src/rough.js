const express = require("express");

// Import your product controller and middleware functions here
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("../controllers/productController");
const { verifySeller } = require("../controllers/userController");
const router = express.Router();

router.post("/createproduct", createProduct); // Create a new product (only for verified sellers)

router.get("/", getAllProducts); // Get a list of all products (for clients and admin)

router.get("/:productId", getProductById); // Get a single product by ID (for clients and admin)

router.patch("/update", updateProduct); // Update a product by ID (only for the seller of the product)

router.delete("/", deleteProduct); // Delete a product by ID (only for the seller of the product)

router.get("/search", searchProducts);
module.exports = router;

const express = require("express");

// Import your product controller and middleware functions here
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("../controllers/productController");
const { verifySeller } = require("../controllers/userController");
const router = express.Router();

// Create a new product (only for verified sellers)
router.post("/createproduct", createProduct);

// Get a list of all products (for clients and admin)
router.get("/", getAllProducts);

// Get a single product by ID (for clients and admin)
router.get("/getProductById", getProductById);

// Update a product by ID (only for the seller of the product)
router.patch("/update", updateProduct);

// Delete a product by ID (only for the seller of the product)
router.delete("/", deleteProduct);

router.get("/search", searchProducts);
module.exports = router;

const fetchProductById = async productId => {
  try {
    const response = await fetch(`/api/products/getProductById/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      // Handle the product data, e.g., set it in your state or use it as needed
      return data;
    } else {
      console.error("Error fetching product:", response.status);
      return null; // Return null to indicate an error
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return null; // Return null to indicate an error
  }
};

// Usage example
const productId = "your_product_id_here"; // Replace with the actual product ID
fetchProductById(productId)
  .then(productData => {
    if (productData) {
      // Product data is available, you can use it here
      console.log("Product details:", productData);
    } else {
      // Handle the error or show a message
      console.log("Failed to fetch product details.");
    }
  })
  .catch(error => {
    // Handle any exceptions
    console.error("Error:", error);
  });
