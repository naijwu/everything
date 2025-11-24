import { SigLIPModel } from "./siglip";
import { ArcFaceModel } from "./arcface";
import { LlavaCaptioningModel } from "./llava";
import { WhisperModel } from "./whisper";

import {
  VisionTextEmbeddingModel,
  FaceEmbeddingModel,
  CaptioningModel,
  SpeechToTextModel
} from "./base";

/**
 * Lazy-loaded models.
 * (You can later switch each model to GPU inference.)
 */

let _vision: VisionTextEmbeddingModel | null = null;
let _face: FaceEmbeddingModel | null = null;
let _caption: CaptioningModel | null = null;
let _speech: SpeechToTextModel | null = null;

export const Models = {
  get vision(): VisionTextEmbeddingModel {
    if (!_vision) _vision = new SigLIPModel();
    return _vision;
  },

  get face(): FaceEmbeddingModel {
    if (!_face) _face = new ArcFaceModel();
    return _face;
  },

  get caption(): CaptioningModel {
    if (!_caption) _caption = new LlavaCaptioningModel();
    return _caption;
  },

  get speech(): SpeechToTextModel {
    if (!_speech) _speech = new WhisperModel();
    return _speech;
  }
};

export * from "./base";
