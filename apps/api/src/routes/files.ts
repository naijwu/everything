import express from "express";
import { filesController } from "../controllers/filesController";

export const filesRouter = express.Router();

filesRouter.get("/:id/signed-url", filesController.getSignedUrl);