const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter title"],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  author: {
    type: String,
    trim: true,
    required: [true, "Please add author"]
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("ToDos", todoSchema);