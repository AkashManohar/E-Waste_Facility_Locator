const mongoose = require("mongoose");
require("dotenv").config();

// ✅ Check if MONGO_URI is Loaded
console.log("Connecting to MongoDB:", process.env.MONGO_URI ? "✅ Loaded" : "❌ Not Loaded");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Atlas Connected...");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // Stop server if connection fails
  }
};

module.exports = connectDB;
