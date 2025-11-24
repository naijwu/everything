import { BaseModel, ModelConfig } from './base';

export class SigLIPModel extends BaseModel {
  constructor(config: ModelConfig) {
    super(config);
  }

  async load(): Promise<void> {
    console.log('Loading SigLIP model...');
    // TODO: Implement model loading
  }

  async unload(): Promise<void> {
    console.log('Unloading SigLIP model...');
  }

  async embed(image: Buffer): Promise<number[]> {
    // TODO: Implement embedding
    return [];
  }
}

