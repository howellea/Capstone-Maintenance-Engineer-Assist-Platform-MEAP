import mongoose, { Document, Schema } from 'mongoose';

export interface ILiveReading extends Document {
  equipmentId: string;
  timestamp: Date;
  tags: {
    temperature?: number;
    flowRate?: number;
    motorStatus?: boolean;
    vibration?: number;
  };
}

const liveSchema = new Schema<ILiveReading>(
  {
    equipmentId: { type: String, required: true },
    timestamp: { type: Date, required: true },
    tags: {
      temperature: Number,
      flowRate: Number,
      motorStatus: Boolean,
      vibration: Number,
    },
  },
  {
    timestamps: true,
  }
);

const LiveReading = mongoose.model<ILiveReading>('LiveReading', liveSchema);
export default LiveReading;
