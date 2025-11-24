import { startWorker } from './worker';

async function main() {
  console.log('Starting caption worker...');
  await startWorker();
}

main().catch(console.error);

