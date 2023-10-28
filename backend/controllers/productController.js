const Product = require("../models/Product");
const Seller = require("../models/sellerModel");
// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, imgURL, seller, stock } =
      req.body;

    // Check if the seller is a verified seller

    if (req.body.seller.isVerified == false) {
      return res
        .status(403)
        .json({ error: "Only verified sellers can create products" });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      imgURL,
      seller, // Set the seller ID from the authenticated seller
      stock, // You can set the initial stock here or provide it in the request body
      // Add more fields as needed
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create a product" });
  }
};

// Get a list of all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve the product" });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, imgURL, stock } = req.body;

    const existingProduct = await Product.findById(req.params.id);

    // Check if the seller is a verified seller and the product belongs to them
    if (
      !req.seller.isVerified ||
      req.seller._id.toString() !== existingProduct.sellerID.toString()
    ) {
      return res
        .status(403)
        .json({ error: "Only the seller can update this product" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        imgURL,
        seller,
        stock,
        // Add more fields as needed
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update the product" });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findById(req.params.id);

    // Check if the seller is a verified seller and the product belongs to them
    if (
      !req.seller.isVerified ||
      req.seller._id.toString() !== existingProduct.sellerID.toString()
    ) {
      return res
        .status(403)
        .json({ error: "Only the seller can delete this product" });
    }

    const deletedProduct = await Product.findByIdAndRemove(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Log the deleted product to the console
    console.log("Deleted product:", deletedProduct);

    res.status(204).end(); // 204 No Content
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete the product" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
