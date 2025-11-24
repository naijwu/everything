import { initElasticClient } from "@everything/indexer/text/elastic";
import { searchMediaText } from "@everything/indexer/text/elastic";

import { initQdrantClient } from "@everything/indexer/vector/qdrant";
import { searchVectors } from "@everything/indexer/vector/qdrant";

import { Models } from "@everything/models";
import { rankResults } from "./ranker";

import { MediaTextSearchResult } from "@everything/indexer/text/elastic";

/**
 * Final unified search result returned to API callers.
 */
export interface SearchResult {
  id: string | number;
  score: number;
  type?: string;
  payload?: any;   // Qdrant payload or Elastic source
  source?: any;    // alias to keep compatibility with your code
}

/**
 * Options for hybrid search.
 */
export interface HybridSearchOptions {
  userId?: string;
  limit?: number;
  weights?: { text: number; vector: number };
}

/**
 * The main hybrid search function.
 * This will be imported by your API and called for each user query.
 */
export async function hybridSearch(
  query: string,
  options: HybridSearchOptions = {}
): Promise<SearchResult[]> {
  const { userId, limit = 30, weights = { text: 0.5, vector: 0.5 } } = options;

  console.log("Running hybridSearch:", { query, userId });

  // -----------------------------
  // 1. Initialize clients
  // -----------------------------

  const elastic = initElasticClient();
  const qdrant = initQdrantClient();

  // -----------------------------
  // 2. TEXT SEARCH (Elasticsearch)
  // -----------------------------

  const textResults = await searchMediaText(elastic, query, {
    userId,
    limit
  });

  const formattedTextResults: SearchResult[] = textResults.map(
    (r: MediaTextSearchResult) => ({
      id: r.id,
      score: r.score,
      type: r.source.type,
      payload: r.source,
      source: r.source
    })
  );

  // -----------------------------
  // 3. VECTOR SEARCH (Qdrant)
  // -----------------------------

  // Embed the text query using your vision/text model (like SigLIP or CLIP)
  const queryEmbedding = await Models.vision.embedText(query);

  const vectorResultsRaw = await searchVectors(qdrant, queryEmbedding, limit, {
    ...(userId ? { key: "userId", match: { value: userId } } : {})
  });

  const formattedVectorResults: SearchResult[] = vectorResultsRaw.map((r) => ({
    id: r.id,
    score: r.score,
    type: r.payload?.type,
    payload: r.payload,
    source: r.payload
  }));

  // -----------------------------
  // 4. FUSION + RANKING
  // -----------------------------

  const finalRankedResults = rankResults(
    formattedTextResults,
    formattedVectorResults,
    weights
  );

  // Only return up to limit
  return finalRankedResults.slice(0, limit);
}
