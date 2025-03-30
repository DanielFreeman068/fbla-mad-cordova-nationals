const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Middleware to ensure user is authenticated (extract userId from JWT)
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach userId to request
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

/**
 * POST /jeopardy/score
 * Expects { finalScore: number } in the body
 * Updates the user's "jeopardyScore" and "coins" in MongoDB
 */
router.post("/score", authMiddleware, async (req, res) => {
  try {
    const { finalScore } = req.body;
    if (typeof finalScore !== "number") {
      return res.status(400).json({ message: "Invalid or missing finalScore" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate coins based on finalScore
    const earnedCoins = Math.floor(finalTime / 40);

    // Update user's coins and jeopardyScore
    user.coins += earnedCoins;
    user.jeopardyScore = Math.max(user.jeopardyScore, finalScore); // or user.jeopardyScore = finalScore

    await user.save();

    return res.status(200).json({
      message: "Jeopardy score and coins updated",
      jeopardyScore: user.jeopardyScore,
      coins: user.coins, // Return coins as well
    });
  } catch (err) {
    console.error("Error updating Jeopardy score:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;