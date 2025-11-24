// packages/models/src/siglip.ts

import { VisionTextEmbeddingModel } from "./base";

/**
 * Stub SigLIP/CLIP model.
 * Replace with actual inference code later.
 */
export class SigLIPModel implements VisionTextEmbeddingModel {
  constructor() {
    console.log("SigLIP model initialized (stub)");
  }

  async embedText(text: string): Promise<number[]> {
    console.log("Embedding text:", text);
    return new Array(1024).fill(0); // stub
  }

  async embedImage(buffer: Buffer): Promise<number[]> {
    console.log("Embedding image (stub)");
    return new Array(1024).fill(0);
  }

  async embedFrames(buffers: Buffer[]): Promise<number[][]> {
    console.log(`Embedding ${buffers.length} video frames (stub)`);
    return buffers.map(() => new Array(1024).fill(0));
  }

  getDimension(): number {
    return 1024;
  }
}
