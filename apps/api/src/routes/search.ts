import { Router } from 'express';

export const searchRouter = Router();

searchRouter.post('/', async (req, res) => {
  // TODO: Implement search
  res.json({ message: 'Search endpoint' });
});

