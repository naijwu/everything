import { Router } from 'express';

export const uploadRouter = Router();

uploadRouter.post('/', async (req, res) => {
  // TODO: Implement file upload
  res.json({ message: 'Upload endpoint' });
});

