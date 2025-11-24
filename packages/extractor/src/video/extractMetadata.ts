export interface VideoMetadata {
  duration: number;
  width: number;
  height: number;
  fps: number;
  codec: string;
}

export async function extractVideoMetadata(videoPath: string): Promise<VideoMetadata> {
  console.log(`Extracting metadata from ${videoPath}`);
  // TODO: Implement metadata extraction
  return {
    duration: 0,
    width: 0,
    height: 0,
    fps: 0,
    codec: '',
  };
}

