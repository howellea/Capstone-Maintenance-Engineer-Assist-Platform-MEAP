import db from '../config/connection.js';
import { User, HistoricalReading } from '../models/index.js';
import cleanDB from './cleanDB.js';

import userData from './userData.json' with { type: 'json' };
import historianData from './historianData.json' with { type: 'json' };

const seedDatabase = async (): Promise<void> => {
  try {
    await db();           // Connect to MongoDB Atlas
    await cleanDB();      // Clear all collections

    // Hash passwords using User.create()
    await Promise.all(userData.map((user) => User.create(user)));

    // Safe to use insertMany for historical readings
    await HistoricalReading.insertMany(historianData);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
