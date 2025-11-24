import { Request, Response } from "express";
import { supabase } from "../supabase";
import { r2, R2_BUCKET } from "../r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { enqueueIngestionJob } from "../queue";
import { randomUUID } from "crypto";

export async function uploadController(req: Request, res: Response) {
  try {
    if (!req.file) return res.status(400).send("Missing file");
    const userId = req.header("x-user-id"); // or JWT-based auth

    if (!userId) return res.status(401).send("Unauthorized");

    const fileId = randomUUID();
    const key = `${userId}/${fileId}`;

    // 1. Upload to R2
    await r2.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      })
    );

    // 2. Insert metadata into Supabase
    const { error } = await supabase.from("media_files").insert({
      id: fileId,
      user_id: userId,
      r2_key: key,
      mime_type: req.file.mimetype,
      status: "pending"
    });

    if (error) throw error;

    // 3. Enqueue ingestion worker
    await enqueueIngestionJob(fileId);

    res.json({ fileId });
  } catch (err: any) {
    console.error(err);
    res.status(500).send(err.message || "Upload failed");
  }
}