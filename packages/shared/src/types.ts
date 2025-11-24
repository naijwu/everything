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

