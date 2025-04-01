import { Schema, model, Document } from 'mongoose';

export interface IEquipmentProfile extends Document {
    equipmentId: string;
    type: string;
    location: string;
    installDate: Date;
    tagsTracked: string[];
}

const equipmentProfileSchema = new Schema<IEquipmentProfile>(
{
    equipmentId: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    installDate: { type: Date, required: true },
    tagsTracked: [{ type: String }],
},
{
    timestamps: true,
}
);

const EquipmentProfile = model<IEquipmentProfile>('EquipmentProfile', equipmentProfileSchema);

export default EquipmentProfile;
