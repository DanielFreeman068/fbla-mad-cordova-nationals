// routes/test.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Middleware to ensure user is authenticated (extract userId from JWT)
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
 * POST /tests/score
 * Expects { subject: string, date: string|Date, score: number }
 * Saves the test score in user.testScores
 */
router.post("/score", authMiddleware, async (req, res) => {
  try {
    const { subject, date, score } = req.body;
    // Validate
    if (!subject || !date || typeof score !== "number") {
      return res
        .status(400)
        .json({ message: "Missing or invalid subject/date/score" });
    }

    // Convert date string to actual Date if needed
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ message: "Invalid date" });
    }

    // Find user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Push the new test score
    user.testScores.push({
      subject,
      date: dateObj,
      score
    });

    await user.save();

    return res.status(200).json({
      message: "Test score saved",
      testScores: user.testScores // Return updated array
    });
  } catch (err) {
    console.error("Error saving test score:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /tests?subject=Math (optional)
 * returns user's testScores, optionally filtered by subject
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const subject = req.query.subject; // e.g. "?subject=Math"
    const user = await User.findById(req.user.id).select("testScores");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let results = user.testScores;
    if (subject) {
      results = results.filter((scoreObj) => scoreObj.subject === subject);
    }

    return res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching test scores:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
