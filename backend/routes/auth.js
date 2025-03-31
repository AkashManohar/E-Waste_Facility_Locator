const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

// ✅ Register Route
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    // 🛑 Check if all fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // 🛑 Check if the user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // ✅ Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        // ✅ Generate JWT Token (Only after user is created)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });

        res.status(201).json({ message: "User registered successfully", token, user });
    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // 🛑 Validate Input
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // ✅ Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // ✅ Compare Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // ✅ Generate JWT Token (Only after successful login)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });

        res.json({ message: "Login successful", token, user });
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
