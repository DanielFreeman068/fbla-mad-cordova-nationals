const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const User = require("./models/User"); // Your user schema
const router = express.Router();

// Transporter for email
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
    },
    });

    // Step 1: Handle password reset request
    router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate token valid for 1 hour
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send reset email
    const resetLink = `https://yourapp.com/reset-password/${token}`;
    await transporter.sendMail({
        to: email,
        subject: "Password Reset Request",
        text: `Click the following link to reset your password: ${resetLink}`,
    });

    res.json({ message: "Password reset link sent" });
    });

    // Step 2: Reset password
    router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
});

module.exports = router;
