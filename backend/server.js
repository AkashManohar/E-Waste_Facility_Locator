require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();

// ✅ Connect to MongoDB
connectDB()
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Stop server if DB connection fails
  });

// ✅ Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// ✅ API Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// ✅ Default Route for Testing
app.get("/", (req, res) => {
  res.send("🌍 E-Waste Recycling API is Running...");
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Start Server after DB Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
