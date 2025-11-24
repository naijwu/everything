import { Router } from 'express';
import { enqueueIngest } from '../services/ingestQueue';

export const ingestRouter = Router();

ingestRouter.post('/', async (req, res) => {
  // TODO: Implement ingest queue
  res.json({ message: 'Ingest endpoint' });
});

