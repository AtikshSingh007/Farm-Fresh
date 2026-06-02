import mongoose from 'mongoose';

/**
 * Connects to MongoDB with retry-friendly config.
 * Exits the process if connection fails on startup.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://localhost:27017/farm_fresh',
      {
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
      }
    );
    console.log(`📡 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database connection error: ${error.message}`);
    console.warn(`⚠️  Server will run but database features won't work.`);
    console.warn(`⚠️  To fix: Follow MONGODB_ATLAS_SETUP.md to set up a free database.`);
    // DON'T exit - let the server run even without DB for static pages
  }
};

export default connectDB;
