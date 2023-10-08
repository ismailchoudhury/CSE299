const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // Verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    // Fetch user by _id and check if they are a admin
    const user = await User.findOne({ _id });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (user.isAdmin) {
      // The user is a admin, proceed with the request
      req.user = user;
      next();
    } else {
      // The user is not a admin, deny access
      return res.status(403).json({ error: "Permission denied" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
