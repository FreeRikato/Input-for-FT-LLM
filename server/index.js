const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
require('dotenv').config();
const Question = require('./models/Question');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// MongoDB Connection
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Hi there"
  });
});

app.post('/submit_questions', [
  body('questions').isArray().withMessage('Questions should be an array'),
  body('questions.*.career_path').isString().withMessage('Career path should be a string'),
  body('questions.*.question').isString().withMessage('Question should be a string')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const questions = req.body.questions.map(q => ({
      career_path: q.career_path,
      question: q.question,
      timestamp: new Date() // Add the timestamp field here
    }));
    await Question.insertMany(questions);
    res.status(201).json({ message: 'Questions submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit questions' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
