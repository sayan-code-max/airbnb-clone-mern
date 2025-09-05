import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  pricePerNight: { type: Number, required: true, min: 0 },
  maxGuests: { type: Number, default: 1, min: 1 },
  amenities: [{ type: String }],
  images: [{ type: String }],
  coordinates: {
    lat: Number,
    lng: Number
  },
  availability: [{
    start: Date,
    end: Date
  }]
}, { timestamps: true });

listingSchema.index({ title: "text", description: "text", city: 1, country: 1 });

export default mongoose.model("Listing", listingSchema);
