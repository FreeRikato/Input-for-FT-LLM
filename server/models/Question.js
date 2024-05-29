const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  career_path: { type: String, required: true },
  question: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
