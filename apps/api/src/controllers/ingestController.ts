import { Request, Response } from "express";
import { supabase } from "../supabase";

export const ingestController = {
  async metadata(req: Request, res: Response) {
    try {
      const { fileId, width, height, duration, exif } = req.body;

      if (!fileId) return res.status(400).send("Missing fileId");

      const { error } = await supabase
        .from("media_metadata")
        .upsert(
          {
            file_id: fileId,
            width,
            height,
            duration,
            exif
          },
          { onConflict: "file_id" }
        );

      if (error) throw error;

      // update status: processing
      await supabase
        .from("media_files")
        .update({ status: "processing" })
        .eq("id", fileId);

      res.json({ ok: true });
    } catch (err: any) {
      console.error("metadata error", err);
      res.status(500).send(err.message);
    }
  },

  async embeddings(req: Request, res: Response) {
    try {
      const { fileId, embeddings } = req.body;

      if (!fileId || !embeddings)
        return res.status(400).send("Missing fileId or embeddings");

      // Here you can:
      // - write embeddings to Qdrant (usually workers handle this directly)
      // - OR store lightweight pointer/flag in DB

      await supabase
        .from("media_files")
        .update({ has_embeddings: true })
        .eq("id", fileId);

      res.json({ ok: true });
    } catch (err: any) {
      console.error("embedding error", err);
      res.status(500).send(err.message);
    }
  },

  async captions(req: Request, res: Response) {
    try {
      const { fileId, caption } = req.body;

      if (!fileId || !caption)
        return res.status(400).send("Missing fileId or caption");

      const { error } = await supabase
        .from("media_metadata")
        .update({ caption })
        .eq("file_id", fileId);

      if (error) throw error;

      res.json({ ok: true });
    } catch (err: any) {
      console.error("caption error", err);
      res.status(500).send(err.message);
    }
  },

  async transcript(req: Request, res: Response) {
    try {
      const { fileId, transcript } = req.body;

      if (!fileId || !transcript)
        return res.status(400).send("Missing fileId or transcript");

      const { error } = await supabase
        .from("media_metadata")
        .update({ transcript })
        .eq("file_id", fileId);

      if (error) throw error;

      res.json({ ok: true });
    } catch (err: any) {
      console.error("transcript error", err);
      res.status(500).send(err.message);
    }
  },

  async complete(req: Request, res: Response) {
    try {
      const { fileId } = req.body;

      if (!fileId) return res.status(400).send("Missing fileId");

      await supabase
        .from("media_files")
        .update({ status: "indexed" })
        .eq("id", fileId);

      res.json({ ok: true });
    } catch (err: any) {
      console.error("complete error", err);
      res.status(500).send(err.message);
    }
  }
};