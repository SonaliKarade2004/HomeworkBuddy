const Homework = require('../models/Homework');

// Create a new homework assignment
exports.createHomework = async (req, res) => {
  try {
    const { title, description, dueDate, assignedTo, subject } = req.body;
    
    // For now, using a placeholder for assignedBy until you implement authentication
    const assignedBy = "65a1b2c3d4e5f6a7b8c9d0e1"; // Replace with actual user ID from auth
    
    const homework = new Homework({
      title,
      description,
      dueDate: new Date(dueDate),
      assignedTo,
      assignedBy,
      subject,
      attachments: req.files ? req.files.map(file => ({
        filename: file.filename,
        path: file.path,
        originalName: file.originalname
      })) : []
    });
    
    await homework.save();
    res.status(201).json({
      success: true,
      message: 'Homework created successfully',
      data: homework
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all homework assignments
exports.getAllHomework = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, assignedTo } = req.query;
    
    let filter = {};
    if (status) filter.status = status;
    if (assignedTo) filter.assignedTo = assignedTo;
    
    const homework = await Homework.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Homework.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: homework,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get a single homework assignment
exports.getHomework = async (req, res) => {
  try {
    const homework = await Homework.findById(req.params.id);
    
    if (!homework) {
      return res.status(404).json({
        success: false,
        message: 'Homework not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: homework
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ Update Homework
exports.updateHomework = async (req, res) => {
  try {
    const updatedHomework = await Homework.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedHomework) {
      return res.status(404).json({ success: false, message: 'Homework not found' });
    }

    res.json({ success: true, data: updatedHomework });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Delete Homework
exports.deleteHomework = async (req, res) => {
  try {
    const deletedHomework = await Homework.findByIdAndDelete(req.params.id);

    if (!deletedHomework) {
      return res.status(404).json({ success: false, message: 'Homework not found' });
    }

    res.json({ success: true, message: 'Homework deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Submit homework
// Submit homework (with required file uploading)
exports.submitHomework = async (req, res) => {
  try {
    const homework = await Homework.findById(req.params.id);

    if (!homework) {
      return res.status(404).json({
        success: false,
        message: 'Homework not found'
      });
    }

    // ✅ Ensure file(s) uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one file must be uploaded to submit homework'
      });
    }

    // Update homework status + submission details
    homework.status = 'submitted';
    homework.submission = {
      submittedAt: new Date(),
      files: req.files.map(file => ({
        filename: file.filename,
        path: file.path,
        originalName: file.originalname
      }))
    };

    await homework.save();

    res.status(200).json({
      success: true,
      message: 'Homework submitted successfully with files',
      data: homework
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// Grade homework
exports.gradeHomework = async (req, res) => {
  try {
    const { grade, feedback } = req.body;
    const homework = await Homework.findById(req.params.id);
    
    if (!homework) {
      return res.status(404).json({
        success: false,
        message: 'Homework not found'
      });
    }
    
    homework.status = 'graded';
    homework.submission.grade = grade;
    homework.submission.feedback = feedback;
    
    await homework.save();
    
    res.status(200).json({
      success: true,
      message: 'Homework graded successfully',
      data: homework
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};