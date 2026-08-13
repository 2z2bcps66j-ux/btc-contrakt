import express, { Router, Request, Response } from 'express';
import Reward from '../models/Reward';
import { authMiddleware } from '../middleware/auth';

const router: Router = express.Router();

// Get rewards
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const rewards = await Reward.find({ userId }).populate('miningId');
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Rewards' });
  }
});

// Get reward statistics
router.get('/stats', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const stats = await Reward.aggregate([
      { $match: { userId: require('mongoose').Types.ObjectId(userId) } },
      { $group: { _id: null, totalEarned: { $sum: '$amount' }, count: { $sum: 1 } } },
    ]);
    res.json(stats[0] || { totalEarned: 0, count: 0 });
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Statistiken' });
  }
});

export default router;
