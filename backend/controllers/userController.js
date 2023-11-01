const User = require("../models/userModel");
const Seller = require("../models/sellerModel");
const Admin = require("../models/adminModel");
const Product = require("../models/product");
const Wishlist = require("../models/wishlist");
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
    const Id = user._id;

    res.status(200).json({ email, token, userType, Id });
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
    const Id = user._id;

    res.status(200).json({ email, token, user, Id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const isAdmin = async (req, res, next) => {
  const adminId = req.body.adminId;
  const admin = await Admin.findOne({ _id: adminId });
  console.log(admin);
  if (admin) {
    next();
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
  console.log(seller);
  const isUpdated = await Seller.updateOne(
    { _id: sellerId }, // Specify the document by its _id
    { $set: { isVerified: true } } // Use $set to update the specific field
  );
  if (isUpdated) {
    return res.status(200).json({ message: "seller verified" });
  }
};

const deleteSeller = async (req, res) => {
  const sellerId = req.body.sellerId;

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

module.exports = {
  signupUser,
  loginUser,
  isAdmin,
  verifySeller,
  deleteSeller,
  getVerifiedSellers,
  getUnverifiedSellers,
};
