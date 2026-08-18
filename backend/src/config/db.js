import mongoose from 'express'; // placeholder import concept, or mongoose

import mongooseClient from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongooseClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/divine_pooja');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
  }
};
