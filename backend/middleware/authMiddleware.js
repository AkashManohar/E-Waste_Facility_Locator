const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    // ✅ Verify Token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Session expired. Please login again." });
    }

    // ✅ Check if User Exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("❌ Authentication Error:", error);
    res.status(500).json({ message: "Server Error. Authentication failed." });
  }
};
