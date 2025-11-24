import express from "express";
import multer from "multer";
import { uploadController } from "../controllers/uploadController";

const upload = multer({ storage: multer.memoryStorage() });

export const uploadRouter = express.Router();

uploadRouter.post("/", upload.single("file"), uploadController);