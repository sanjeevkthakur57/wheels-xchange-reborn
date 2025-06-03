
const express = require('express');
const multer = require('multer');
const path = require('path');
const Car = require('../models/Car');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images (jpeg, jpg, png) and PDF files are allowed!'));
    }
  }
});

// Middleware to authenticate user
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = user._id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Create car listing
router.post('/', upload.fields([
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
]), auth, async (req, res) => {
  try {
    const {
      make, model, year, fuel, transmission, bodyType, variant,
      kilometers, owners, registrationState, registrationNumber,
      color, insurance, insuranceValidity, expectedPrice, description,
      name, email, phone, city
    } = req.body;

    // Prepare photos object
    const photos = {};
    if (req.files) {
      ['frontView', 'sideView', 'rearView', 'interior', 'dashboard', 'seats'].forEach(photoType => {
        if (req.files[photoType]) {
          photos[photoType] = req.files[photoType][0].filename;
        }
      });
    }

    // Prepare documents object
    const documents = {};
    if (req.files) {
      ['rc', 'insurance', 'puc', 'service'].forEach(docType => {
        if (req.files[docType]) {
          documents[docType] = req.files[docType][0].filename;
        }
      });
    }

    const car = new Car({
      make,
      model,
      year,
      fuel,
      transmission,
      bodyType,
      variant,
      kilometers,
      owners,
      registrationState,
      registrationNumber,
      color,
      insurance,
      insuranceValidity,
      expectedPrice,
      description,
      seller: req.userId,
      photos,
      documents,
      // Contact info will be retrieved from seller data when needed
      name,
      email,
      phone,
      city
    });

    await car.save();

    res.status(201).json({
      message: 'Car listing created successfully',
      car
    });
  } catch (error) {
    console.error('Car creation error:', error);
    res.status(500).json({ message: 'Server error creating car listing' });
  }
});

// Get all car listings
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find({ status: 'approved' }).populate('seller', 'name email');
    res.json(cars);
  } catch (error) {
    console.error('Get cars error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all car listings (admin view - includes all statuses)
router.get('/admin', async (req, res) => {
  try {
    const cars = await Car.find().populate('seller', 'name email');
    res.json(cars);
  } catch (error) {
    console.error('Get admin cars error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get car by ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('seller', 'name email');
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    console.error('Get car error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update car status (admin only)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    
    res.json(car);
  } catch (error) {
    console.error('Update car status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete car listing
router.delete('/:id', auth, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Check if user owns this car or is admin
    if (car.seller.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this car' });
    }

    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Car listing deleted successfully' });
  } catch (error) {
    console.error('Delete car error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
