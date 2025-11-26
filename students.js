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

// ✅ ADD THIS SAMPLE ENDPOINT
router.post('/sample', async (req, res) => {
  try {
    const sampleStudents = [
      { 
        name: "Aarav Mehta", 
        email: "aarav@school.com", 
        class: "Grade 10", 
        progress: 85,
        homeworks: []
      },
      { 
        name: "Siya Patel", 
        email: "siya@school.com", 
        class: "Grade 10", 
        progress: 92,
        homeworks: []
      },
      { 
        name: "Alex Chen", 
        email: "alex@school.com", 
        class: "Grade 10", 
        progress: 78,
        homeworks: []
      },
      { 
        name: "Emma Davis", 
        email: "emma@school.com", 
        class: "Grade 10", 
        progress: 88,
        homeworks: []
      }
    ];

    // Clear existing and insert new
    await Student.deleteMany({});
    const students = await Student.insertMany(sampleStudents);

    res.json({ 
      success: true, 
      message: 'Sample students created successfully',
      data: students 
    });
  } catch (error) {
    console.error('Error creating sample students:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Get student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: "Student not found" 
      });
    }
    res.json({ 
      success: true, 
      data: student 
    });
  } catch (error) {
    res.status(500).json({ 
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
    
    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: "Student not found" 
      });
    }
    
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

// Delete student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    
    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: "Student not found" 
      });
    }
    
    res.json({ 
      success: true, 
      message: "Student deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router;