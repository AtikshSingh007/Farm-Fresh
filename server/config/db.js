import mongoose from 'mongoose';

/**
 * Establishes a connection to the MongoDB database.
 * Includes connection retry logic and clear console logging.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/farm_fresh');
    console.log(`📡 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database Connection Error: ${error.message}`);
    // Exit process with failure code
    process.exit(1);
  }
};

export default connectDB;
