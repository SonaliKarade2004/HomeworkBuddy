const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth.cjs"); // Import auth routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Default route to fix "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Routes
app.use("/api", authRoutes);

// Connect MongoDB
mongoose
  .connect(
    "mongodb+srv://riyakaruna3713_db_user:zzxajKbHO0ntO4pP@cluster0.vlxexgu.mongodb.net/Homeworkbuddy"
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
