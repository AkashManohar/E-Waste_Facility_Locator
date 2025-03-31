const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Fetch User Profile
router.get("/details", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.json({ message: "User profile fetched successfully!", user });
  } catch (error) {
    console.error("❌ Profile Fetch Error:", error);
    res.status(500).json({ message: "Server error! Please try again later." });
  }
});

// ✅ Fetch User Recycling History (Fixed)
router.get("/history", authMiddleware, async (req, res) => {
  console.log("📥 /history route hit"); // ✅ Debugging log
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    console.log("🔍 Found User History:", user.history); // ✅ Debugging log
    res.json({
      message: "History fetched successfully!",
      history: user.history || [],
      credits: user.credits || 0,
      claimedRewards: user.claimedRewards || [],
    });
  } catch (error) {
    console.error("❌ History Fetch Error:", error);
    res.status(500).json({ message: "Server error! Please try again later." });
  }
});

// ✅ Handle E-Waste Disposal & Update Credits (Fixed)
router.post("/dispose", authMiddleware, async (req, res) => {
  try {
    const { deviceType, brand, model, credits, pickupDate, pickupTime, location, phone } = req.body;

    console.log("📤 Received Disposal Data:", req.body); // ✅ Debugging log

    // 🛑 Validate Required Fields
    if (!deviceType || !brand || !model || !credits || !pickupDate || !pickupTime || !location || !phone) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // ✅ Convert Date Properly
    const parsedDate = new Date(pickupDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid pickup date format!" });
    }

    // ✅ Fetch User from Database
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // ✅ Ensure `history` exists
    if (!Array.isArray(user.history)) {
      user.history = [];
    }

    // ✅ Store Full Disposal Details
    const disposalEntry = {
      deviceType,
      brand,
      model,
      credits: parseInt(credits),
      pickupDate: parsedDate,
      pickupTime,
      location,
      phone,
    };

    console.log("✅ Saving Disposal Entry:", disposalEntry); // ✅ Debugging log

    user.history.push(disposalEntry);
    user.credits += parseInt(credits);
    await user.save();

    res.json({
      message: "E-Waste Disposal Successful!",
      credits: user.credits,
      history: user.history,
    });

  } catch (error) {
    console.error("❌ Disposal Error:", error);
    res.status(500).json({ message: "Server error! Please try again later." });
  }
});

// ✅ Redeem Reward
router.post("/redeem", authMiddleware, async (req, res) => {
  try {
    const { reward, points } = req.body;

    // 🛑 Validate Input
    if (!reward || !points) {
      return res.status(400).json({ message: "Reward and points are required!" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // 🛑 Check if user has enough credits
    if (user.credits < points) {
      return res.status(400).json({ message: "Not enough credits to redeem this reward!" });
    }

    // ✅ Ensure `claimedRewards` exists
    if (!Array.isArray(user.claimedRewards)) {
      user.claimedRewards = [];
    }

    // ✅ Deduct points and update claimed rewards
    user.credits -= points;
    user.claimedRewards.push({ reward, date: new Date() }); // ✅ Store reward date properly

    await user.save();

    res.json({
      message: "Reward redeemed successfully!",
      credits: user.credits,
      claimedRewards: user.claimedRewards,
    });

  } catch (error) {
    console.error("❌ Redeem Reward Error:", error);
    res.status(500).json({ message: "Server error! Please try again later." });
  }
});

// ✅ Reset User Data
router.post("/reset", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Reset credits, history, and claimed rewards
    user.credits = 0;
    user.history = [];
    user.claimedRewards = [];

    await user.save();

    res.json({
      message: "Account reset successful!",
      credits: user.credits,
      history: user.history,
      claimedRewards: user.claimedRewards,
    });

  } catch (error) {
    console.error("❌ Reset Data Error:", error);
    res.status(500).json({ message: "Server error! Please try again later." });
  }
});

module.exports = router;
