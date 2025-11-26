const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Homework = require("../models/Homework");

// ------------------ Multer Setup ------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// ----------------- ADD HOMEWORK -----------------
router.post("/add", upload.single("file"), async (req, res) => {
  try {
    const { title, dueDate } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "Title and Due Date are required",
      });
    }

    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const homework = new Homework({
      title,
      dueDate,
      fileUrl,
    });

    await homework.save();

    return res.status(201).json({
      success: true,
      message: "Homework added successfully",
      homework,
    });
  } catch (error) {
    console.error("Error adding homework:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// ----------------- GET ALL HOMEWORK -----------------
router.get("/", async (req, res) => {
  try {
    const homeworkList = await Homework.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      homework: homeworkList,
    });
  } catch (error) {
    console.error("Error fetching homework:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
