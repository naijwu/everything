import { SpeechToTextModel } from "./base";

export class WhisperModel implements SpeechToTextModel {
  constructor() {
    console.log("Whisper STT model initialized (stub)");
  }

  async transcribeAudio(buffer: Buffer): Promise<string> {
    console.log("Transcribing audio (stub)");
    return "This is a placeholder transcription.";
  }
}
