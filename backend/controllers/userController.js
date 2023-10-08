const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = _id => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

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
  const { email, password, isSuperAdmin } = req.body;

  try {
    const user = await User.signup(email, password, isSuperAdmin);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
