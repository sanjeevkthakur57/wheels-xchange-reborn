const express = require('express');
const connectDB = require('./db');
const Car = require('./models/Car');
const User = require('./models/User');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Auth Middleware
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Auth Routes
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const user = await User.create({
      name,
      email,
      password
    });
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Car Routes with file upload
app.post('/api/cars', protect, upload.fields([
  { name: 'frontView', maxCount: 1 },
  { name: 'sideView', maxCount: 1 },
  { name: 'rearView', maxCount: 1 },
  { name: 'interior', maxCount: 1 },
  { name: 'dashboard', maxCount: 1 },
  { name: 'seats', maxCount: 1 },
  { name: 'rc', maxCount: 1 },
  { name: 'insurance', maxCount: 1 },
  { name: 'puc', maxCount: 1 },
  { name: 'service', maxCount: 1 }
]), async (req, res) => {
  try {
    const files = req.files;
    const photos = {};
    const documents = {};
    
    // Process uploaded files
    if (files) {
      ['frontView', 'sideView', 'rearView', 'interior', 'dashboard', 'seats'].forEach(key => {
        if (files[key]) {
          photos[key] = `/uploads/${files[key][0].filename}`;
        }
      });
      
      ['rc', 'insurance', 'puc', 'service'].forEach(key => {
        if (files[key]) {
          documents[key] = `/uploads/${files[key][0].filename}`;
        }
      });
    }
    
    const car = new Car({
      ...req.body,
      photos,
      documents,
      seller: req.user._id
    });
    
    const savedCar = await car.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all cars
app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find({});
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single car
app.get('/api/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a car
app.put('/api/cars/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a car
app.delete('/api/cars/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
