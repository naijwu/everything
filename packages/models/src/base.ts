/**
 * Embedding model for text + images.
 * (CLIP, SigLIP, OpenCLIP, etc.)
 */
export interface VisionTextEmbeddingModel {
  embedText(text: string): Promise<number[]>;
  embedImage(buffer: Buffer): Promise<number[]>;
  embedFrames(buffers: Buffer[]): Promise<number[][]>;

  getDimension(): number;
}

/**
 * Face embedding model (ArcFace / InsightFace)
 */
export interface FaceEmbeddingModel {
  embedFace(buffer: Buffer): Promise<number[]>;
  getDimension(): number;
}

/**
 * Image captioning model (LLaVA, BLIP-2, etc.)
 */
export interface CaptioningModel {
  captionImage(buffer: Buffer): Promise<string>;
}

/**
 * Speech-to-text or audio embedding model (Whisper)
 */
export interface SpeechToTextModel {
  transcribeAudio(buffer: Buffer): Promise<string>;
}
