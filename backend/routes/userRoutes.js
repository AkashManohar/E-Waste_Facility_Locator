const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Ensure correct model path
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Save Waste Classification to User History
router.post("/history", authMiddleware, async (req, res) => {
  try {
    const { wasteType, image } = req.body;
    
    // ✅ Find the logged-in user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // ✅ Ensure history exists
    if (!Array.isArray(user.history)) {
      user.history = [];
    }

    // ✅ Push new classification entry
    user.history.push({ wasteType, image, date: new Date() });

    // ✅ Save to database
    await user.save();

    res.json({ message: "History updated successfully!", history: user.history });
  } catch (error) {
    console.error("❌ Error saving history:", error);
    res.status(500).json({ message: "Error saving history." });
  }
});

module.exports = router;
