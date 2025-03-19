const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Import existing routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const ticTacToeRoutes = require("./routes/ticTacToe");
const jeopardyRoutes = require("./routes/jeopardy");
const timerChallengeRoutes = require("./routes/timerChallenge");
const testRoutes = require("./routes/test");
const shopRoutes = require("./routes/shop");


const app = express();

// CORS configuration
const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (like file:// requests)
    if (!origin) return callback(null, true);
    callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));


app.options('*', cors(corsOptions));

app.use(express.json({ limit: "30mb" }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Import User model
const User = require("./models/User");

// Email Transporter (Using Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 🔹 Request Password Reset
// --- Request Password Reset Code ---
app.post("/forgot-password-code", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    // Generate a random 6-digit code as a string (e.g. "483920")
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // Set expiry 10 minutes from now
    user.verificationCode = code;
    user.verificationCodeExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Password Reset Verification Code",
      html: `<p>Your verification code is: <strong>${code}</strong></p>
             <p>This code will expire in 10 minutes.</p>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    return res.json({ message: "Verification code sent to your email!" });
  } catch (error) {
    console.error("Error in /forgot-password-code:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// --- Reset Password using Code ---
app.post("/reset-password-code", async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the code matches and is not expired
    if (
      user.verificationCode !== code ||
      user.verificationCodeExpire < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired verification code" });
    }

    // Hash the new password and update the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    // Clear verification fields
    user.verificationCode = undefined;
    user.verificationCodeExpire = undefined;
    await user.save();

    return res.json({ message: "Password reset successful!" });
  } catch (error) {
    console.error("Error in /reset-password-code:", error);
    return res.status(500).json({ message: "Server error" });
  }
});



// Existing routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tictactoe", ticTacToeRoutes);
app.use("/jeopardy", jeopardyRoutes);
app.use("/timerChallenge", timerChallengeRoutes);
app.use("/tests", testRoutes);
app.use("/shop", shopRoutes);


app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
