export interface ModelConfig {
  modelPath: string;
  device?: 'cpu' | 'cuda' | 'mps';
}

export abstract class BaseModel {
  protected config: ModelConfig;

  constructor(config: ModelConfig) {
    this.config = config;
  }

  abstract load(): Promise<void>;
  abstract unload(): Promise<void>;
}

