import { BaseModel, ModelConfig } from './base';

export class LLaVAModel extends BaseModel {
  constructor(config: ModelConfig) {
    super(config);
  }

  async load(): Promise<void> {
    console.log('Loading LLaVA model...');
    // TODO: Implement model loading
  }

  async unload(): Promise<void> {
    console.log('Unloading LLaVA model...');
  }

  async generateCaption(image: Buffer): Promise<string> {
    // TODO: Implement caption generation
    return '';
  }
}

