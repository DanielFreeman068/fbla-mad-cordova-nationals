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

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://127.0.0.1:5500',  // or add "file://" or the relevant scheme used by Cordova WebView
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
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
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found!" });

  // Generate reset token
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15min" });

  // Save token to DB
  user.resetToken = token;
  user.resetTokenExpire = Date.now() + 15 * 60 * 1000; // 15 minutes expiration
  await user.save();
  console.log("User after saving reset token:", user);

  // Send Email
  const resetLink = `http://127.0.0.1:5500/learningApp/www/password-reset.html?token=${token}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
  });

  res.json({ message: "Password reset link sent to your email!" });
});

// 🔹 Reset Password
app.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Log token details

    const user = await User.findOne({ email: decoded.email });
    console.log("User Found in DB:", user);

    if (!user || user.resetToken !== token || user.resetTokenExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token!" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpire = null;
    await user.save();

    res.json({ message: "Password reset successful!" });
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(400).json({ message: "Invalid token!" });
  }
});


// Existing routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tictactoe", ticTacToeRoutes);
app.use("/jeopardy", jeopardyRoutes);
app.use("/timerChallenge", timerChallengeRoutes);
app.use("/tests", testRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
