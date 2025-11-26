const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  class: {
    type: String,
    required: [true, 'Class is required']
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  homeworks: [{
    homeworkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Homework'
    },
    title: String,
    badges: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    feedback: String,
    submittedAt: Date,
    status: {
      type: String,
      enum: ['assigned', 'submitted', 'graded'],
      default: 'assigned'
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);