import dotenv from 'dotenv';

export function loadEnv() {
  dotenv.config();
  
  const required = ['DATABASE_URL'];
  
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}

