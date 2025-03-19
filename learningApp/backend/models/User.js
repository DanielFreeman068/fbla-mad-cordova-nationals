const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // XP & level
  xp: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  // Cloudinary URLs for profile & banner pictures
  profilePicture: {
    type: String,
    default: "https://res.cloudinary.com/dmrevelyc/image/upload/v1736633601/default_aeldkt.webp"
  },
  bannerPicture: {
    type: String,
    default: "https://res.cloudinary.com/dmrevelyc/image/upload/v1736639379/defaultbanner_hnbtpb.webp"
  },
  // Side info data
  jeopardyScore: {
    type: Number,
    default: 0
  },
  ticTacToeWins: {
    type: Number,
    default: 0
  },
  coins: {
    type: Number,
    default: 2500  // Set default coins for testing
  },
  timerChallengeTime: {
    type: Number,
    default: 0
  },
  testScores: [
    {
      subject: { type: String, required: true },
      date: { type: Date, required: true },
      score: { type: Number, required: true }
    }
  ],
  verificationCode: { type: String },
  verificationCodeExpire: { type: Date },
  // New field to store purchased clothing items
  ownedItems: {
    type: [String],
    default: []
  },
  avatar: { type: Object, default: {} }

});

module.exports = mongoose.model("User", userSchema);
