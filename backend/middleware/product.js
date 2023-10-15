// const jwt = require("jsonwebtoken");

// // Middleware for authentication
// const requireAuth = (req, res, next) => {
//   // Verify user is authenticated
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(401).json({ error: "Authorization token required" });
//   }

//   const token = authorization.split(" ")[1];

//   try {
//     // Verify the token with your secret key (stored securely, preferably in an environment variable)
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach the user ID or other relevant information to the request for use in controllers
//     req.userId = decoded._id; // This assumes your token includes the user's _id

//     next();
//   } catch (error) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };

// module.exports = { requireAuth };
