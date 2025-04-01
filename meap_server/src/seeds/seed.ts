import db from '../config/connection.js';
import { Thought, User, Historian } from '../models/index.js';
import cleanDB from './cleanDB.js';

import userData from './userData.json' with { type: 'json'};
import thoughtData from './thoughtData.json' with { type: 'json' };
import historianData from './historianData.json' with { type: 'json' };


const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    await Thought.insertMany(thoughtData);
    await User.create(userData);
    await Historian.insertMany(historianData);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
