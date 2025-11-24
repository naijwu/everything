import "dotenv/config";

export const env = {
  PORT: process.env.PORT || "4000",

  SUPABASE_URL: process.env.SUPABASE_URL!,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,

  R2_ENDPOINT: process.env.CLOUDFLARE_R2_ENDPOINT!,
  R2_BUCKET: process.env.CLOUDFLARE_R2_BUCKET!,
  R2_ACCESS_KEY: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
  R2_SECRET_KEY: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,

  QUEUE_URL: process.env.QUEUE_URL || ""
};

for (const [key, val] of Object.entries(env)) {
  if (!val) throw new Error(`Missing environment variable: ${key}`);
}