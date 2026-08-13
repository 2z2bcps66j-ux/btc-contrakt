import express, { Router, Request, Response } from 'express';
import User from '../models/User';
import { authMiddleware } from '../middleware/auth';

const router: Router = express.Router();

// Link wallet
router.post('/link', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { walletAddress } = req.body;
    const user = await User.findByIdAndUpdate(userId, { walletAddress }, { new: true });
    res.json({ message: 'Wallet verlinkt', wallet: user?.walletAddress });
  } catch (error) {
    res.status(400).json({ error: 'Fehler beim Verlinken der Wallet' });
  }
});

// Get wallet info
router.get('/info', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const user = await User.findById(userId);
    res.json({ walletAddress: user?.walletAddress });
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Wallet-Info' });
  }
});

export default router;
