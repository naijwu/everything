export interface Media {
  id: string;
  type: 'image' | 'video' | 'audio';
  path: string;
  createdAt: Date;
  metadata?: Record<string, any>;
}

export interface IngestJob {
  id: string;
  mediaId: string;
  type: 'image' | 'video' | 'audio';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
}

export interface Embedding {
  id: string;
  mediaId: string;
  vector: number[];
  timestamp?: number;
  metadata?: Record<string, any>;
}

// how data exists in elasticsearch

export type MediaType = "image" | "video" | "audio";

export interface MediaTextDocument {
  id: string; 
  fileId: string;
  userId: string;
  type: MediaType;

  // Searchable text fields
  caption?: string | null; 
  transcript?: string | null;
  tags?: string[];
  filename?: string | null;

  metadata?: Record<string, any> | null;

  createdAt: number;
}


// how data exists in vector DB

export type MediaEmbeddingPayload =
  | ImageEmbeddingPayload
  | VideoFramePayload
  | AudioClipPayload
  | FaceEmbeddingPayload;

export interface BasePayload {
  fileId: string;
  userId: string;
  bucketPath: string;
  thumbnailUrl?: string;
  createdAt: number;
}

export interface ImageEmbeddingPayload extends BasePayload {
  type: "image";
  width: number;
  height: number;
}

export interface VideoFramePayload extends BasePayload {
  type: "videoFrame";
  timestamp: number;
  frameIdx: number;
  shotId?: string;
}

export interface AudioClipPayload extends BasePayload {
  type: "audioClip";
  audioStart: number;
  audioDuration: number;
}

export interface FaceEmbeddingPayload extends BasePayload {
  type: "face";
  timestamp?: number;
  personId: string;
  faceBox: Record<string, number>;
}

