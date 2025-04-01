import { User, HistoricalReading, LiveReading, EquipmentFault, EquipmentProfile } from '../models/index.js';
import process from 'process';

const cleanDB = async (): Promise<void> => {
  try {
    await User.deleteMany({});
    console.log('User collection cleaned.');

    await HistoricalReading.deleteMany({});
    console.log('HistoricalReading collection cleaned.');

    await LiveReading.deleteMany({});
    console.log('LiveReading collection cleaned.');

    await EquipmentFault.deleteMany({});
    console.log('EquipmentFault collection cleaned.');

    await EquipmentProfile.deleteMany({});
    console.log('EquipmentProfile collection cleaned.');

    process.exit(0); // Exit cleanly after success
  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;

