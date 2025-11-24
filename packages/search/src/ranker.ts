// packages/search/src/rankResults.ts

import { SearchResult } from "./hybridSearch";

export function rankResults(
  textResults: SearchResult[],
  vectorResults: SearchResult[],
  weights: { text: number; vector: number } = { text: 0.5, vector: 0.5 }
): SearchResult[] {
  console.log("Ranking search results");

  const textWeight = weights.text;
  const vectorWeight = weights.vector;

  const normalizedText = normalizeScores(textResults);
  const normalizedVector = normalizeScores(vectorResults);

  const combined = new Map<
    string | number,
    { textScore: number; vectorScore: number; result: SearchResult }
  >();

  for (const r of normalizedText) {
    combined.set(r.id, {
      textScore: r.score,
      vectorScore: 0,
      result: r
    });
  }

  for (const r of normalizedVector) {
    if (combined.has(r.id)) {
      const existing = combined.get(r.id)!;
      existing.vectorScore = r.score;
    } else {
      combined.set(r.id, {
        textScore: 0,
        vectorScore: r.score,
        result: r
      });
    }
  }

  const fused: SearchResult[] = [];

  for (const { textScore, vectorScore, result } of combined.values()) {
    const finalScore =
      textScore * textWeight + vectorScore * vectorWeight;

    fused.push({ ...result, score: finalScore });
  }

  fused.sort((a, b) => b.score - a.score);

  return fused;
}

function normalizeScores(results: SearchResult[]): SearchResult[] {
  if (results.length === 0) return [];

  const scores = results.map((r) => r.score);
  const max = Math.max(...scores);
  const min = Math.min(...scores);

  if (max === min) {
    return results.map((r) => ({ ...r, score: 1 }));
  }

  return results.map((r) => ({
    ...r,
    score: (r.score - min) / (max - min)
  }));
}
