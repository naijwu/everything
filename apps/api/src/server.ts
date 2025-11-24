import express from 'express';
import { healthRouter } from './routes/health';
import { uploadRouter } from './routes/upload';
import { searchRouter } from './routes/search';
import { ingestRouter } from './routes/ingest';

const PORT = process.env.PORT || 3000;

export async function startServer() {
  const app = express();

  app.use(express.json());

  app.use('/health', healthRouter);
  app.use('/upload', uploadRouter);
  app.use('/search', searchRouter);
  app.use('/ingest', ingestRouter);

  app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}`);
  });
}

