import { FaceEmbeddingModel } from "./base";

export class ArcFaceModel implements FaceEmbeddingModel {
  constructor() {
    console.log("ArcFace model initialized (stub)");
  }

  async embedFace(buffer: Buffer): Promise<number[]> {
    console.log("Embedding face (stub)");
    return new Array(512).fill(0);
  }

  getDimension(): number {
    return 512;
  }
}
