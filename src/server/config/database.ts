import mongoose from 'mongoose';

export const connectDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/btc-contrakt';
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB verbunden');
  } catch (error) {
    console.error('❌ MongoDB Fehler:', error);
    process.exit(1);
  }
};
