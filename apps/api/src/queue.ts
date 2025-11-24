export async function enqueueIngestionJob(fileId: string) {
  console.log("Enqueue ingestion job:", fileId);

  // TODO: connect to your queue system
  // Example:
  // await redis.lpush("ingestion_jobs", fileId);

  return true;
}