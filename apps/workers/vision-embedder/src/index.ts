import { startWorker } from './worker';

async function main() {
  console.log('Starting vision embedder worker...');
  await startWorker();
}

main().catch(console.error);

