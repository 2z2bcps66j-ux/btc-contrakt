import mongoose, { Schema, Document } from 'mongoose';

export interface IReward extends Document {
  userId: mongoose.Types.ObjectId;
  miningId: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  status: 'pending' | 'distributed' | 'failed';
  distributionDate?: Date;
  txHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

const rewardSchema = new Schema<IReward>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    miningId: { type: Schema.Types.ObjectId, ref: 'Mining', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'BTC' },
    status: { type: String, enum: ['pending', 'distributed', 'failed'], default: 'pending' },
    distributionDate: { type: Date },
    txHash: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IReward>('Reward', rewardSchema);
