import express, { Router, Request, Response } from 'express';
import Mining from '../models/Mining';
import { authMiddleware } from '../middleware/auth';

const router: Router = express.Router();

// Get all mining contracts
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const contracts = await Mining.find({ userId });
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Verträge' });
  }
});

// Create mining contract
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { poolName, poolUrl, contractValue, hashRate } = req.body;
    const mining = new Mining({ userId, poolName, poolUrl, contractValue, hashRate });
    await mining.save();
    res.status(201).json(mining);
  } catch (error) {
    res.status(400).json({ error: 'Fehler beim Erstellen des Vertrags' });
  }
});

export default router;
