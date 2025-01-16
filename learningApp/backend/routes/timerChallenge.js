// routes/timerChallenge.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

/**
 * POST /timerChallenge/time
 * Expects { finalTime: number } in req.body
 * Updates user's timerChallengeTime in MongoDB
 */
router.post("/time", authMiddleware, async (req, res) => {
  try {
    const { finalTime } = req.body;
    if (typeof finalTime !== "number") {
      return res.status(400).json({ message: "Invalid or missing finalTime" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If you want to store the BEST (longest) time:
    user.timerChallengeTime = Math.max(user.timerChallengeTime, finalTime);
    user.coins += 25;

    // If you prefer storing the LATEST time:
    // user.timerChallengeTime = finalTime;

    await user.save();

    return res.status(200).json({
      message: "Timer challenge time updated",
      timerChallengeTime: user.timerChallengeTime,
      coins: user.coins, // Return coins as well

    });
  } catch (err) {
    console.error("Error updating timer challenge time:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
