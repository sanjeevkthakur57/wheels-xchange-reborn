
const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  fuel: {
    type: String,
    required: true
  },
  transmission: {
    type: String,
    required: true
  },
  bodyType: {
    type: String,
    required: true
  },
  variant: {
    type: String
  },
  kilometers: {
    type: String,
    required: true
  },
  owners: {
    type: String,
    required: true
  },
  registrationState: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  insurance: {
    type: String,
    required: true
  },
  insuranceValidity: {
    type: String
  },
  expectedPrice: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  
  // Contact information
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  photos: {
    frontView: String,
    sideView: String,
    rearView: String,
    interior: String,
    dashboard: String,
    seats: String
  },
  
  documents: {
    rc: String,
    insurance: String,
    puc: String,
    service: String
  },
  
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'sold'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Car', CarSchema);
