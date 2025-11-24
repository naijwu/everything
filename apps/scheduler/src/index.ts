import { startEnqueueWorker } from './workers/enqueueWorker';

async function main() {
  console.log('Starting scheduler...');
  await startEnqueueWorker();
}

main().catch(console.error);

