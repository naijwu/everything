import express from "express";
import cors from "cors";
import { env } from "./env";
import { uploadRouter } from "./routes/upload";
import { searchRouter } from "./routes/search";
import { filesRouter } from "./routes/files";
import { ingestRouter } from "./routes/ingest";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/upload", uploadRouter);
app.use("/search", searchRouter);
app.use("/files", filesRouter);
app.use("/ingest", ingestRouter);

app.listen(env.PORT, () => {
  console.log(`API running on port ${env.PORT}`);
});