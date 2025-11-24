-- Initial database schema

CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(20) NOT NULL CHECK (type IN ('image', 'video', 'audio')),
  path TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  metadata JSONB
);

CREATE TABLE IF NOT EXISTS ingest_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id UUID NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id UUID NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  vector_id TEXT NOT NULL,
  timestamp FLOAT,
  metadata JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_media_type ON media(type);
CREATE INDEX idx_ingest_jobs_status ON ingest_jobs(status);
CREATE INDEX idx_embeddings_media_id ON embeddings(media_id);

