import express from "express";
import { ingestController } from "../controllers/ingestController";

export const ingestRouter = express.Router();

// Workers report extracted metadata (dimensions, duration, etc.)
ingestRouter.post("/metadata", ingestController.metadata);

// Workers submit frame embeddings or image embeddings
ingestRouter.post("/embeddings", ingestController.embeddings);

// Workers submit captions (LLaVA or BLIP)
ingestRouter.post("/captions", ingestController.captions);

// Workers submit transcripts (Whisper)
ingestRouter.post("/transcript", ingestController.transcript);

// Worker signals ingestion complete (status = 'indexed')
ingestRouter.post("/complete", ingestController.complete);