// routes/user.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { cloudinary } = require("../utils/CloudinaryConfig.js"); // Make sure you have this file set up

// Middleware to check if user is authenticated
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
 * GET /users/:id => fetch user data
 * Only the owner (matching userId) can see their data.
 */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /users/:id/xp => update XP
 * Example usage for level system
 */
router.post("/:id/xp", authMiddleware, async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { xpChange } = req.body;
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 1) Add XP
    user.xp += xpChange;

    // 2) Level up if xp >= 100
    const xpPerLevel = 100;
    while (user.xp >= xpPerLevel) {
      user.xp -= xpPerLevel;
      user.level += 1;
    }

    // 3) Save changes
    await user.save();

    return res.status(200).json({
      message: "XP updated successfully",
      experience: user.xp,
      level: user.level
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /users/:id/uploadProfile => upload profile picture to Cloudinary
 * Expects { base64Image } in the request body
 */
router.post("/:id/uploadProfile", authMiddleware, async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { base64Image } = req.body;
    if (!base64Image) {
      return res.status(400).json({ message: "No image provided" });
    }

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "jolt_profile_pics", // optional: specify any folder name in your Cloudinary
      public_id: `profile_${req.user.id}_${Date.now()}`,
      overwrite: true
    });

    // Update user's profilePicture with Cloudinary URL
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { profilePicture: uploadResponse.secure_url },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      message: "Profile picture uploaded",
      profilePicture: user.profilePicture
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /users/:id/uploadBanner => upload banner to Cloudinary
 * Expects { base64Image } in the request body
 */
router.post("/:id/uploadBanner", authMiddleware, async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { base64Image } = req.body;
    if (!base64Image) {
      return res.status(400).json({ message: "No image provided" });
    }

    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "jolt_banner_pics", // optional: specify any folder name in Cloudinary
      public_id: `banner_${req.user.id}_${Date.now()}`,
      overwrite: true
    });

    // Update user's bannerPicture with the Cloudinary URL
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { bannerPicture: uploadResponse.secure_url },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      message: "Banner uploaded",
      bannerPicture: user.bannerPicture
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST /users/:id/avatar => Save avatar configuration
router.post("/:id/avatar", authMiddleware, async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { avatar } = req.body;
    if (!avatar || typeof avatar !== "object") {
      return res.status(400).json({ message: "Invalid avatar data" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update the user's avatar field
    user.avatar = avatar;
    await user.save();

    return res.status(200).json({
      message: "Avatar saved successfully",
      avatar: user.avatar
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST /users/:id/switchHomePage
router.post("/:id/switchHomePage", authMiddleware, async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Toggle the alternateHomePage field
    user.alternateHomePage = !user.alternateHomePage;
    await user.save();

    return res.status(200).json({
      message: "Homepage preference updated successfully",
      alternateHomePage: user.alternateHomePage
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
