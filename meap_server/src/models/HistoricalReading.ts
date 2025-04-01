import { Schema, model, Document } from 'mongoose';

export interface IHistoricalReading extends Document {
  equipmentId: string;
  timestamp: Date;
  averageTemperature: number;
  averageFlowRate: number;
  averageVibration: number;
  motorStatus: boolean; // could be the most recent or a trend value
}

const historicalSchema = new Schema<IHistoricalReading>(
  {
    equipmentId: { type: String, required: true },
    timestamp: { type: Date, required: true },
    averageTemperature: { type: Number, required: true },
    averageFlowRate: { type: Number, required: true },
    averageVibration: { type: Number, required: true },
    motorStatus: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const HistoricalReading = model<IHistoricalReading>('HistoricalReading', historicalSchema);

export default HistoricalReading;
