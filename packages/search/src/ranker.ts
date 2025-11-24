import { SearchResult } from './hybridSearch';

export function rankResults(
  textResults: SearchResult[],
  vectorResults: SearchResult[],
  weights: { text: number; vector: number } = { text: 0.5, vector: 0.5 }
): SearchResult[] {
  console.log('Ranking search results');
  // TODO: Implement result ranking
  return [];
}

