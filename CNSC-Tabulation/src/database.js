require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const YourModel = require('./models/Panel'); // Replace with your actual model

// MongoDB Atlas URI
const MONGO_URI = "mongodb+srv://cuatro:1234@cluster0.lghjt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
    return mongoose.connection;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};


// Create Sample Data for YourModel
const createSampleData = async () => {
  try {
    const sample = new YourModel({
      name: 'Sample Name',
      age: 30,
      isActive: true,
    });
    await sample.save();
    console.log('Sample data saved:', sample);
  } catch (err) {
    console.error('Error saving sample data:', err.message);
  }
};

// Run database initialization
const initializeDatabase = async () => {
  await connectDB();
  await createSampleData();
  mongoose.connection.close(); // Close the connection after operations
};

module.exports = initializeDatabase;
