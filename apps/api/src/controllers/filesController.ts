import { Request, Response } from "express";
import { supabase } from "../supabase";
import { r2, R2_BUCKET } from "../r2";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const filesController = {
  async getSignedUrl(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { data, error } = await supabase
        .from("media_files")
        .select("r2_key")
        .eq("id", id)
        .single();

      if (error) throw error;

      const signedUrl = await getSignedUrl(
        r2,
        new GetObjectCommand({
          Bucket: R2_BUCKET,
          Key: data.r2_key
        }),
        { expiresIn: 3600 }
      );

      res.json({ url: signedUrl });
    } catch (err: any) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }
};