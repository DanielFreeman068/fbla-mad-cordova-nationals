const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();

const ticTacToeRoutes = require("./routes/ticTacToe");
const jeopardyRoutes = require("./routes/jeopardy"); 
const timerChallengeRoutes = require("./routes/timerChallenge"); 
const testRoutes = require("./routes/test");


const corsOptions = {
  origin: '*',  // or add "file://" or the relevant scheme used by Cordova WebView
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


app.use(express.json({ limit: "30mb" }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/auth", authRoutes);
app.use("/users", userRoutes); 
app.use("/tictactoe", ticTacToeRoutes);
app.use("/jeopardy", jeopardyRoutes);
app.use("/timerChallenge", timerChallengeRoutes);
app.use("/tests", testRoutes);


app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
