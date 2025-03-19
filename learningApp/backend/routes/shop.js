const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Simple auth middleware (similar to that in your user routes)
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

/**
 * GET /shop/coins
 * Returns the user's current coin balance.
 */
router.get("/coins", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ coins: user.coins });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /shop/purchase
 * Body should include: { itemId, price, category }
 * Processes a purchase if the user has enough coins and hasn't already purchased the item.
 */
router.post("/purchase", authMiddleware, async (req, res) => {
  const { itemId, price, category } = req.body;
  if (!itemId || price == null || !category) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if item is already owned
    if (user.ownedItems.includes(itemId)) {
      return res.status(400).json({ message: "Item already purchased" });
    }

    // Check if user has enough coins
    if (user.coins < price) {
      return res.status(400).json({ message: "Not enough coins" });
    }

    // Deduct coins and mark item as owned
    user.coins -= price;
    user.ownedItems.push(itemId);
    await user.save();

    return res.status(200).json({
      message: "Purchase successful",
      coins: user.coins,
      ownedItems: user.ownedItems
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
