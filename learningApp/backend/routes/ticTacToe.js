// routes/ticTacToe.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Middleware to ensure user is authenticated
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach userId to request
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// POST /tictactoe/win => increment ticTacToeWins by 1
router.post("/win", authMiddleware, async (req, res) => {
  try {
    // We have req.user.id from the token
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.ticTacToeWins += 1;
    user.coins += 5;

    await user.save();

    return res.status(200).json({
      message: "Tic Tac Toe win recorded",
      ticTacToeWins: user.ticTacToeWins,
      coins: user.coins, // Return coins as well

    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
