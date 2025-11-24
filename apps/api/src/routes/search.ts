import express from "express";
import { searchController } from "../controllers/searchController";

export const searchRouter = express.Router();

searchRouter.get("/", searchController);