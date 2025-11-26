const express = require('express');
const Student = require('../models/student');

const router = express.Router();

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ 
      success: true, 
      data: students 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Create student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ 
      success: true, 
      message: 'Student created successfully',
      data: student 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Update student progress
router.put('/:id/progress', async (req, res) => {
  try {
    const { progress } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id, 
      { progress }, 
      { new: true }
    );
    
    res.json({ 
      success: true, 
      message: "Progress updated successfully",
      data: student 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router;