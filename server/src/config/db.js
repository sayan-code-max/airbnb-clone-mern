// import mongoose from "mongoose";

// export const connectDB = async () => {
//   const uri = process.env.MONGO_URI;
//   if (!uri) throw new Error("MONGO_URI not set");
//   mongoose.set("strictQuery", true);
//   await mongoose.connect(uri);
//   console.log("Connected to MongoDB");
// };

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
