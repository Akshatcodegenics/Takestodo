import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { errorResponder, notFound } from "./middleware/errorHandler.js";

dotenv.config();

async function bootstrap() {
  const app = express();

  const corsOptions = {
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json({ limit: "1mb" }));

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/tasks", taskRoutes);

  app.use(notFound);
  app.use(errorResponder);

  const port = process.env.PORT || 4000;
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log(`[Server] Listening on port ${port}`));
}

bootstrap().catch((err) => {
  console.error("Fatal error on bootstrap", err);
  process.exit(1);
});
