const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  credits: { type: Number, default: 0 },
  history: [
    {
      deviceType: String,
      brand: String,
      model: String,
      credits: Number,
      pickupDate: Date,
      pickupTime: String,
      location: String,
      phone: String,
    },
  ],
  claimedRewards: [
    {
      reward: String,
      date: Date,
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
