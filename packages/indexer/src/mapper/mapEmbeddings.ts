export function mapEmbeddingsToFrames(
  embeddings: number[][],
  frameTimestamps: number[]
): Array<{ timestamp: number; embedding: number[] }> {
  console.log("Mapping embeddings to frames");

  if (embeddings.length === 0 || frameTimestamps.length === 0) {
    console.warn("mapEmbeddingsToFrames: empty inputs");
    return [];
  }

  if (embeddings.length !== frameTimestamps.length) {
    console.warn(
      `mapEmbeddingsToFrames: length mismatch — ${embeddings.length} embeddings vs ${frameTimestamps.length} timestamps`
    );
  }

  const length = Math.min(embeddings.length, frameTimestamps.length);

  const result: Array<{ timestamp: number; embedding: number[] }> = new Array(
    length
  );

  for (let i = 0; i < length; i++) {
    result[i] = {
      timestamp: frameTimestamps[i],
      embedding: embeddings[i]
    };
  }

  return result;
}
