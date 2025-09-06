import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDB from "./config/db.js";   

import authRoutes from "./routes/auth.js";
import listingRoutes from "./routes/listings.js";
import bookingRoutes from "./routes/bookings.js";

dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true
}));

app.get("/", (_req, res) =>
  res.json({ status: "ok", service: "airbnb-clone-api" })
);

app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ API listening on port ${PORT}`));
  })
  .catch(err => {
    console.error("DB connection error:", err);
    process.exit(1);
  });
