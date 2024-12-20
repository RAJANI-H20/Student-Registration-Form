const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(cors({
  origin: '*',  // Allow requests from this origin
  methods: ['POST'],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/StudentDb')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Create Student Schema
const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  qualification: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  institutionType: { type: String, required: true },
  institutionName: { type: String, required: true },
  institutionLocation: { type: String, required: true },
  addressNumber: { type: String, required: true },
  addressStreet: { type: String, required: true },
  addressCity: { type: String, required: true },
  addressState: { type: String, required: true },
  addressCountry: { type: String, required: true },
  profilePhoto: { type: String } // Save the file path to the database
});

const Student = mongoose.model('Student', studentSchema);

// Endpoint to handle form submission
app.post('/students', upload.single('profilePhoto'), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('File:', req.file);
    const studentData = req.body;
    if (req.file) {
      studentData.profilePhoto = `/uploads/${req.file.filename}`;
    }
    const student = new Student(studentData);
    await student.save();
    res.status(201).json(student); // Return JSON response on success
  } catch (error) {
    console.error('Error:', error);
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});