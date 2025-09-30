import mongoose from "mongoose";

export async function connectDB(uri) {
  try {
    await mongoose.connect(uri, {
      dbName: uri.split("/").pop(),
    });
    console.log("[DB] Connected to MongoDB");
  } catch (err) {
    console.error("[DB] Connection error:", err.message);
    process.exit(1);
  }
}
