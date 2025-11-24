import { CaptioningModel } from "./base";

export class LlavaCaptioningModel implements CaptioningModel {
  constructor() {
    console.log("LLaVA captioning model initialized (stub)");
  }

  async captionImage(buffer: Buffer): Promise<string> {
    console.log("Captioning image (stub)");
    return "A placeholder caption for this image.";
  }
}
