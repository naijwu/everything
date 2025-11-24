// packages/search/src/elastic.ts

import { Client } from "@elastic/elasticsearch";
import { MediaTextDocument } from "@everything/shared/types";

export const MEDIA_TEXT_INDEX = "media_text";

/**
 * Initialize Elasticsearch client.
 * Supports:
 * - ELASTIC_URL
 * - ELASTIC_API_KEY (optional)
 * - ELASTIC_USERNAME / ELASTIC_PASSWORD (optional)
 */
export function initElasticClient() {
  const node = process.env.ELASTIC_URL;
  if (!node) {
    throw new Error("ELASTIC_URL is not set");
  }

  const apiKey = process.env.ELASTIC_API_KEY;
  const username = process.env.ELASTIC_USERNAME;
  const password = process.env.ELASTIC_PASSWORD;

  const client = new Client({
    node,
    auth: apiKey
      ? { apiKey }
      : username && password
      ? { username, password }
      : undefined
  });

  return client;
}

/**
 * Ensure index exists with a reasonable mapping for media search.
 */
export async function ensureMediaTextIndex(client: Client) {
  const exists = await client.indices.exists({ index: MEDIA_TEXT_INDEX });
  if (exists) {
    return;
  }

  await client.indices.create({
    index: MEDIA_TEXT_INDEX,
    settings: {
      analysis: {
        analyzer: {
          default: {
            type: "standard"
          }
        }
      }
    },
    mappings: {
      properties: {
        id: { type: "keyword" },
        fileId: { type: "keyword" },
        userId: { type: "keyword" },
        type: { type: "keyword" },

        caption: { type: "text" },
        transcript: { type: "text" },
        filename: { type: "text" },

        tags: { type: "keyword" },

        metadata: { type: "object", enabled: true },

        createdAt: { type: "date", format: "epoch_millis" }
      }
    }
  });

  console.log(`Created Elasticsearch index: ${MEDIA_TEXT_INDEX}`);
}

/**
 * Index or update a single media text document.
 */
export async function indexMediaTextDocument(
  client: Client,
  doc: MediaTextDocument
) {
  await client.index({
    index: MEDIA_TEXT_INDEX,
    id: doc.id,
    document: doc,
    refresh: "false" // can be "wait_for" if you want immediate consistency
  });
}

/**
 * Bulk index helper (for initial backfills or batch jobs).
 */
export async function bulkIndexMediaTextDocuments(
  client: Client,
  docs: MediaTextDocument[]
) {
  if (!docs.length) return;

  const operations: any[] = [];

  for (const doc of docs) {
    operations.push({ index: { _index: MEDIA_TEXT_INDEX, _id: doc.id } });
    operations.push(doc);
  }

  const res = await client.bulk({
    operations,
    refresh: "false"
  });

  if (res.errors) {
    console.warn("Elasticsearch bulk indexing errors", res);
  }
}

/**
 * Search options for media text.
 */
export interface MediaTextSearchOptions {
  userId?: string;
  type?: "image" | "video" | "audio";
  limit?: number;
}

/**
 * Result type for text search.
 */
export interface MediaTextSearchResult {
  id: string;
  score: number;
  source: MediaTextDocument;
}

/**
 * Perform a text-based search over captions, transcripts, tags, etc.
 * This is one half of hybrid search (the other half is vector search).
 */
export async function searchMediaText(
  client: Client,
  query: string,
  options: MediaTextSearchOptions = {}
): Promise<MediaTextSearchResult[]> {
  const { userId, type, limit = 20 } = options;

  const must: any[] = [];
  const filter: any[] = [];

  if (query && query.trim().length > 0) {
    must.push({
      multi_match: {
        query,
        fields: [
          "caption^3",
          "transcript^2",
          "tags^2",
          "filename^1",
          "metadata.*"
        ],
        type: "best_fields"
      }
    });
  }

  if (userId) {
    filter.push({ term: { userId } });
  }

  if (type) {
    filter.push({ term: { type } });
  }

  const body: any = {
    query: {
      bool: {
        must: must.length ? must : [{ match_all: {} }],
        filter: filter.length ? filter : undefined
      }
    },
    size: limit
  };

  const res = await client.search({
    index: MEDIA_TEXT_INDEX,
    body
  });

  const hits = res.hits.hits || [];

  return hits.map((hit: any) => ({
    id: hit._id,
    score: hit._score ?? 0,
    source: hit._source as MediaTextDocument
  }));
}
