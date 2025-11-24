export interface SearchResult {
  id: string;
  score: number;
  metadata: Record<string, any>;
}

export async function hybridSearch(
  query: string,
  vectorQuery?: number[]
): Promise<SearchResult[]> {
  console.log('Performing hybrid search');
  // TODO: Implement hybrid search combining text and vector
  return [];
}

