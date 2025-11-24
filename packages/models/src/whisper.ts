import { BaseModel, ModelConfig } from './base';

export class WhisperModel extends BaseModel {
  constructor(config: ModelConfig) {
    super(config);
  }

  async load(): Promise<void> {
    console.log('Loading Whisper model...');
    // TODO: Implement model loading
  }

  async unload(): Promise<void> {
    console.log('Unloading Whisper model...');
  }

  async transcribe(audio: Buffer): Promise<string> {
    // TODO: Implement transcription
    return '';
  }
}

