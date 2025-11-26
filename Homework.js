const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },

  dueDate: { 
    type: String,   // Use string because your frontend sends string
    required: true 
  },

  // Optional file URL
  fileUrl: { 
    type: String, 
    default: null 
  },

}, { timestamps: true });

module.exports = mongoose.model('Homework', homeworkSchema);
