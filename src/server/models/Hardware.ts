import mongoose, { Schema, Document } from 'mongoose';

export interface IHardware extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  model: string;
  type: 'ASIC' | 'GPU' | 'CPU';
  hashRate: number;
  power: number;
  temperature: number;
  status: 'online' | 'offline' | 'maintenance';
  lastSeen: Date;
  createdAt: Date;
  updatedAt: Date;
}

const hardwareSchema = new Schema<IHardware>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    model: { type: String, required: true },
    type: { type: String, enum: ['ASIC', 'GPU', 'CPU'], required: true },
    hashRate: { type: Number, required: true },
    power: { type: Number, required: true },
    temperature: { type: Number, default: 0 },
    status: { type: String, enum: ['online', 'offline', 'maintenance'], default: 'online' },
    lastSeen: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IHardware>('Hardware', hardwareSchema);
