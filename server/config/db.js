const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    
    const environment = process.env.NODE_ENV;
    
    if (environment === 'development') {
      await mongoose.connect(process.env.MONGO_URI_LOCAL);
      console.log("Connected to local MongoDB");
    }

    if (environment === 'production') {
      await mongoose.connect(process.env.MONGO_URI_ATLAS);
      console.log("Connected to MongoDB Atlas");
    }

  } catch (error) {
    console.log("Error connecting to DB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;