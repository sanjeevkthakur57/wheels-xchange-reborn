
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Replace this with your actual MongoDB Atlas connection string
    // Format: mongodb+srv://username:password@cluster.mongodb.net/wheelsxchange
    const mongoURI = process.env.MONGO_URI || 'mongodb+srv://your-username:your-password@your-cluster.mongodb.net/wheelsxchange?retryWrites=true&w=majority';
    
    const conn = await mongoose.connect(mongoURI);
    
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Atlas Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
