import { startServer } from './server';
import { loadEnv } from './env';

async function main() {
  loadEnv();
  await startServer();
}

main().catch(console.error);

