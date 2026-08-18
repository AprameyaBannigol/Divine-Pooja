import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';
import { seedDatabase } from './utils/seed.js';
import Pooja from './models/Pooja.js';

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();

    // Auto-seed if database collections are empty
    const count = await Pooja.countDocuments();
    if (count === 0) {
      console.log('Database empty. Seeding initial development dataset...');
      await seedDatabase();
    }

    app.listen(PORT, () => {
      console.log(`Divine Pooja REST API Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server due to database connection error: ${error.message}`);
    process.exit(1);
  }
};

startServer();
