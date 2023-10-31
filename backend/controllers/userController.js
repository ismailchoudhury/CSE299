const User = require("../models/userModel");
const Seller = require("../models/sellerModel");
const Admin = require("../models/adminModel"); // Import Admin model if you have one
const jwt = require("jsonwebtoken");

const createToken = _id => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Login a user
const loginUser = async (req, res) => {
  // console.log(req.body);
  const { email, password, userType } = req.body; // Add userType field to the request body

  try {
    let user;

    switch (userType) {
      case "customer":
        user = await User.login(email, password);
        break;
      case "seller":
        user = await Seller.login(email, password);
        break;
      case "admin":
        user = await Admin.login(email, password);
        break;
      default:
        user = null;
    }

    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, userType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup a user (with optional super admin flag)
const signupUser = async (req, res) => {
  const { email, password, userType } = req.body; // Add userType and isAdmin fields to the request body

  try {
    let user;

    switch (userType) {
      case "customer":
        user = await User.signup(email, password);
        break;
      case "seller":
        user = await Seller.signup(email, password);
        break;
      case "admin":
        user = await Admin.signup(email, password);
        break;
      default:
        user = null;
    }

    if (!user) {
      return res.status(400).json({ error: "Invalid userType" });
    }

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const isAdmin = async (req, res, next) => {
  const adminId = req.body.adminId; // Assuming you have authenticated the user and stored their information in req.user
  const admin = await Admin.findOne({ _id: adminId });
  console.log(admin);
  if (admin) {
    next(); // User is an admin, proceed to the next function
  } else {
    res.status(403).json({ error: "Permission denied" });
  }
};
const verifySeller = async (req, res) => {
  const sellerId = req.body.sellerId;
  const seller = await Seller.findOne({ _id: sellerId });
  if (!seller) {
    return res.status(403).json({ message: "no such seller" });
  }
  // const updatedseller = await User.findByIdAndUpdate(
  //   sellerId,
  //   {
  //     isVerified: true,
  //   },
  //   { new: true }
  // );
  console.log(seller);
  const isUpdated = await Seller.updateOne(
    { _id: sellerId }, // Specify the document by its _id
    { $set: { isVerified: true } } // Use $set to update the specific field
  );
  if (isUpdated) {
    return res.status(200).json({ message: "seller verified" });
  }

  // try {
  //   const seller = await VerifiedSeller.verifySeller(sellerId);
  //   res.status(200).json({ message: "Seller verified successfully", seller });
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }
};

const deleteSeller = async (req, res) => {
  const sellerId = req.body.sellerId; // Assuming the sellerId is passed as a route parameter

  try {
    // Find the seller by ID and remove it
    const deletedSeller = await Seller.findByIdAndRemove(sellerId);

    if (!deletedSeller) {
      return res.status(403).json({ message: "Seller not found" });
    }

    return res.status(200).json({ message: "Seller deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete the seller" });
  }
};

const getVerifiedSellers = async (req, res) => {
  try {
    const UnverifiedSellers = await Seller.find({
      userType: "seller",
      isVerified: true,
    });

    res.status(200).json(UnverifiedSellers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve unverified sellers" });
  }
};

const getUnverifiedSellers = async (req, res) => {
  try {
    const UnverifiedSellers = await Seller.find({
      userType: "seller",
      isVerified: false,
    });

    res.status(200).json(UnverifiedSellers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve unverified sellers" });
  }
};
const getCart = async (req, res) => {
  try {
    const userId = req.body.userId; // Use req.query to get the userId from the URL
    const user = await User.findOne({ _id: userId }).populate("cart");

    if (user) {
      return res.send({ code: 200, message: "Got cart", data: user.cart });
    } else {
      return res.status(404).send({ code: 404, message: "User not found" });
    }
  } catch (error) {
    console.error("Error getting cart:", error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const productId = req.body.productId;

    // Find the user by ID
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).send({ code: 404, message: "User not found" });
    }

    // Check if the product is already in the cart
    const existingCartItem = user.cart.find(
      item => item && item.productId && item.productId.equals(productId)
    );

    if (existingCartItem) {
      // If the product is already in the cart, increment the quantity
      existingCartItem.quantity += 1;
    } else {
      // Add the new product to the cart.
      user.cart.push({
        productId,
        quantity: 1,
      });
    }

    // Save the updated user with the new cart item (if necessary)
    await user.save();

    return res.status(200).send({
      code: 200,
      message: "Successfully added to cart",
      user,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const productId = req.body.productId;

    // Find the user by ID
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).send({ code: 404, message: "User not found" });
    }

    // Check if the product is in the cart
    const existingCartItem = user.cart.find(
      item => item && item.productId && item.productId.equals(productId)
    );

    if (existingCartItem) {
      if (existingCartItem.quantity > 1) {
        // If the product is in the cart with a quantity greater than 1, decrement the quantity.
        existingCartItem.quantity -= 1;
      } else {
        // If the product has a quantity of 1, remove it from the cart.
        user.cart = user.cart.filter(item => !item.productId.equals(productId));
      }

      // Save the updated user with the modified cart.
      await user.save();

      return res.status(200).send({
        code: 200,
        message: "Successfully removed from cart",
        user,
      });
    } else {
      return res.status(404).send({
        code: 404,
        message: "Product not found in the user's cart",
      });
    }
  } catch (error) {
    console.error("Error removing from cart:", error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

module.exports = {
  signupUser,
  loginUser,
  isAdmin,
  verifySeller,
  deleteSeller,
  getVerifiedSellers,
  getUnverifiedSellers,
  getCart,
  addToCart,
  removeFromCart,
};
