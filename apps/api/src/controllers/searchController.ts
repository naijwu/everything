import { Request, Response } from "express";
import { hybridSearch } from "@everything/search";

export async function searchController(req: Request, res: Response) {
  try {
    const q = req.query.q as string;
    const userId = req.header("x-user-id");

    if (!q) return res.status(400).send("Missing query");

    const results = await hybridSearch(q, {
      userId: userId || undefined,
      limit: 50
    });

    res.json({ results });
  } catch (err: any) {
    console.error(err);
    res.status(500).send(err.message);
  }
}