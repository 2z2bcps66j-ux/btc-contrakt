import express, { Router, Request, Response } from 'express';
import Hardware from '../models/Hardware';
import { authMiddleware } from '../middleware/auth';

const router: Router = express.Router();

// Get all hardware
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const hardware = await Hardware.find({ userId });
    res.json(hardware);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Hardware' });
  }
});

// Add hardware
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { name, model, type, hashRate, power } = req.body;
    const device = new Hardware({ userId, name, model, type, hashRate, power });
    await device.save();
    res.status(201).json(device);
  } catch (error) {
    res.status(400).json({ error: 'Fehler beim Hinzufügen der Hardware' });
  }
});

// Update hardware status
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { status, temperature } = req.body;
    const device = await Hardware.findByIdAndUpdate(req.params.id, { status, temperature, lastSeen: Date.now() }, { new: true });
    res.json(device);
  } catch (error) {
    res.status(400).json({ error: 'Fehler beim Aktualisieren der Hardware' });
  }
});

export default router;
