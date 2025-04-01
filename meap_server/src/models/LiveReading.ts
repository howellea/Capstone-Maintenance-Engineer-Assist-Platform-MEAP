import { Schema, model, Document } from 'mongoose';

export interface ILiveReading extends Document {
  equipmentId: string;
  timestamp: Date;
  temperature: number;
  flowRate: number;
  vibration: number;
  motorStatus: boolean;
}

const liveSchema = new Schema<ILiveReading>(
  {
    equipmentId: { type: String, required: true },
    timestamp: { type: Date, required: true },
    temperature: { type: Number, required: true },
    flowRate: { type: Number, required: true },
    vibration: { type: Number, required: true },
    motorStatus: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const LiveReading = model<ILiveReading>('LiveReading', liveSchema);

export default LiveReading;
