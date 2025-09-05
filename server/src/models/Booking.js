import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true, min: 0 },
  guests: { type: Number, default: 1, min: 1 },
  status: { type: String, enum: ["reserved","cancelled","completed"], default: "reserved" }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
