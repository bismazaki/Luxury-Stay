const jwt = require("jsonwebtoken");

const JWT_SECRET = "I@mgoodgirl"; // Change this to a strong secret key

// Middleware to fetch user from JWT token
const fetchUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied! No token provided" });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
    req.user = decoded.user; // Add user details to request object
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = fetchUser;
