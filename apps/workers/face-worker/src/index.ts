import { startWorker } from './worker';

async function main() {
  console.log('Starting face worker...');
  await startWorker();
}

main().catch(console.error);

