const Product = require("../models/product");
const Seller = require("../models/sellerModel");
// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, imgURL, sellerId, stock } =
      req.body;

    // Find the seller by their ID
    const seller = await Seller.findOne({ _id: sellerId });

    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    if (!seller.isVerified) {
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
      seller: sellerId,
      stock,
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
    const productId = req.body.productId; // Assuming productId is a route parameter
    const productToGet = await Product.findById(productId);
    if (!productToGet) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(productToGet);
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
    const { sellerId, productId } = req.body;

    // Find the seller by their ID
    const seller = await Seller.findOne({ _id: sellerId });

    // const product = await Product.findOne({ _id: productId });

    // console.log(seller._id.toString());
    // console.log(product.seller.toString());

    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    if (!seller.isVerified) {
      return res
        .status(403)
        .json({ error: "Only verified sellers can delete products" });
    }

    const deletedProduct = await Product.findByIdAndRemove(productId);
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
