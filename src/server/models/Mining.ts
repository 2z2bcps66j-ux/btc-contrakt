import mongoose, { Schema, Document } from 'mongoose';

export interface IMining extends Document {
  userId: mongoose.Types.ObjectId;
  poolName: string;
  poolUrl: string;
  contractValue: number;
  hashRate: number;
  difficulty: number;
  status: 'active' | 'paused' | 'completed';
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const miningSchema = new Schema<IMining>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    poolName: { type: String, required: true },
    poolUrl: { type: String, required: true },
    contractValue: { type: Number, required: true },
    hashRate: { type: Number, required: true },
    difficulty: { type: Number, default: 1 },
    status: { type: String, enum: ['active', 'paused', 'completed'], default: 'active' },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IMining>('Mining', miningSchema);
