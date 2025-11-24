// packages/indexer/src/vector/qdrant.ts

import { QdrantClient } from "@qdrant/js-client-rest";
import {
  MediaEmbeddingPayload,
  ImageEmbeddingPayload,
  VideoFramePayload,
  AudioClipPayload,
  FaceEmbeddingPayload
} from "@everything/shared/types";

export const MEDIA_COLLECTION = "media_embeddings";

/**
 * Local TypeScript definitions because the REST client is untyped.
 */

export interface QdrantPoint {
  id: string | number;
  vector: number[];
  payload: Record<string, any>;
}

export interface QdrantSearchResult {
  id: string | number;
  score: number;
  payload: MediaEmbeddingPayload;
}

/**
 * Initialize Qdrant client.
 */
export function initQdrantClient() {
  return new QdrantClient({
    url: process.env.QDRANT_URL!,
    apiKey: process.env.QDRANT_API_KEY || undefined,
  });
}

/**
 * Build a point object for upsert.
 */
function buildPoint(
  id: string,
  vector: number[],
  payload: MediaEmbeddingPayload
): QdrantPoint {
  return {
    id,
    vector,
    payload
  };
}

/**
 * Generic embedding upsert.
 */
export async function upsertEmbedding(
  client: QdrantClient,
  id: string,
  vector: number[],
  payload: MediaEmbeddingPayload
) {
  const point = buildPoint(id, vector, payload);

  await client.upsert(MEDIA_COLLECTION, {
    wait: true,
    points: [point],
  });

  return { id };
}

/**
 * Typed convenience wrappers
 */
export const upsertImageEmbedding = upsertEmbedding as (
  client: QdrantClient,
  id: string,
  vector: number[],
  payload: ImageEmbeddingPayload
) => Promise<{ id: string }>;

export const upsertVideoFrameEmbedding = upsertEmbedding as (
  client: QdrantClient,
  id: string,
  vector: number[],
  payload: VideoFramePayload
) => Promise<{ id: string }>;

export const upsertAudioClipEmbedding = upsertEmbedding as (
  client: QdrantClient,
  id: string,
  vector: number[],
  payload: AudioClipPayload
) => Promise<{ id: string }>;

export const upsertFaceEmbedding = upsertEmbedding as (
  client: QdrantClient,
  id: string,
  vector: number[],
  payload: FaceEmbeddingPayload
) => Promise<{ id: string }>;

/**
 * Generic vector search (typed wrapper)
 */
export async function searchVectors(
  client: QdrantClient,
  embedding: number[],
  limit: number,
  filter?: any
): Promise<QdrantSearchResult[]> {
  const res = await client.search(MEDIA_COLLECTION, {
    vector: embedding,
    limit,
    with_payload: true,
    filter: filter ? { must: [filter] } : undefined,
  });

  return res.map((r: any) => ({
    id: r.id,
    score: r.score,
    payload: r.payload as MediaEmbeddingPayload,
  }));
}

/**
 * Filter builders
 */
export function filterByUserId(userId: string) {
  return { key: "userId", match: { value: userId } };
}

export function filterByFileId(fileId: string) {
  return { key: "fileId", match: { value: fileId } };
}

export function filterByType(type: MediaEmbeddingPayload["type"]) {
  return { key: "type", match: { value: type } };
}

export function andFilters(...must: any[]) {
  return { must };
}
