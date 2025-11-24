import { startWorker } from './worker';

async function main() {
  console.log('Starting whisper worker...');
  await startWorker();
}

main().catch(console.error);

