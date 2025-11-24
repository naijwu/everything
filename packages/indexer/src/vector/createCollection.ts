import { QdrantClient } from "@qdrant/js-client-rest";

export async function ensureMediaCollection(client: QdrantClient) {
  const exists = await client.getCollections().catch(() => null);

  const collectionName = "media_embeddings";

  if (exists?.collections?.find((c: any) => c.name === collectionName)) {
    console.log("Qdrant collection already exists:", collectionName);
    return;
  }

  await client.createCollection(collectionName, {
    vectors: {
      size: 1024,
      distance: "Cosine"
    },
    optimizers_config: {
      default_segment_number: 4
    },
    shard_number: 1,
    on_disk_payload: true,
  });

  // optional: declare schema (recommended)
  await client.createPayloadIndex(collectionName, {
    field_name: "type",
    field_schema: "keyword"
  });

  await client.createPayloadIndex(collectionName, {
    field_name: "fileId",
    field_schema: "keyword"
  });

  await client.createPayloadIndex(collectionName, {
    field_name: "userId",
    field_schema: "keyword"
  });

  await client.createPayloadIndex(collectionName, {
    field_name: "timestamp",
    field_schema: "float"
  });

  console.log("Created Qdrant collection:", collectionName);
}
