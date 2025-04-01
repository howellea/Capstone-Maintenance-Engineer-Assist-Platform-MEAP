import { Schema, model, Document } from 'mongoose';

export interface IEquipmentFault extends Document {
    equipmentId: string;
    timestamp: Date;
    faultType: string;
    severity: 'low' | 'medium' | 'high';
    resolved: boolean;
    notes?: string;
}

const faultSchema = new Schema<IEquipmentFault>(
{
    equipmentId: { type: String, required: true },
    timestamp: { type: Date, required: true },
    faultType: { type: String, required: true },
    severity: { type: String, enum: ['low', 'medium', 'high'], required: true },
    resolved: { type: Boolean, default: false },
    notes: { type: String },
},
{
    timestamps: true,
}
);

const EquipmentFault = model<IEquipmentFault>('EquipmentFault', faultSchema);

export default EquipmentFault;
