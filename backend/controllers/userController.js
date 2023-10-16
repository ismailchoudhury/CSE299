const User = require("../models/userModel");
const Seller = require("../models/sellerModel");
const Admin = require("../models/adminModel"); // Import Admin model if you have one
const jwt = require("jsonwebtoken");

const createToken = _id => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password, role } = req.body; // Add role field to the request body

  try {
    let user;

    switch (role) {
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

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup a user (with optional super admin flag)
const signupUser = async (req, res) => {
  const { email, password, role } = req.body; // Add role and isAdmin fields to the request body

  try {
    let user;

    switch (role) {
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
      return res.status(400).json({ error: "Invalid Role" });
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

module.exports = { signupUser, loginUser, isAdmin, verifySeller, deleteSeller };
