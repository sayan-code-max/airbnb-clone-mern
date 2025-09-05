import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import Booking from "../models/Booking.js";
import Listing from "../models/Listing.js";

const router = Router();

// Create booking with simple availability check (non-overlapping dates for listing)
router.post("/", requireAuth, async (req, res) => {
  const { listingId, startDate, endDate, guests } = req.body;
  const listing = await Listing.findById(listingId);
  if (!listing) return res.status(404).json({ message: "Listing not found" });
  const overlaps = await Booking.findOne({
    listing: listingId,
    status: { $ne: "cancelled" },
    $or: [
      { startDate: { $lte: new Date(endDate) }, endDate: { $gte: new Date(startDate) } }
    ]
  });
  if (overlaps) return res.status(400).json({ message: "Dates not available" });
  const nights = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000*60*60*24));
  const totalPrice = Math.max(1, nights) * listing.pricePerNight;
  const booking = await Booking.create({
    user: req.user.id,
    listing: listingId,
    startDate, endDate, guests, totalPrice
  });
  res.status(201).json(booking);
});

// Get my bookings
router.get("/me", requireAuth, async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate("listing");
  res.json(bookings);
});

// Cancel booking
router.post("/:id/cancel", requireAuth, async (req, res) => {
  const updated = await Booking.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, { status: "cancelled" }, { new: true });
  if (!updated) return res.status(404).json({ message: "Booking not found" });
  res.json(updated);
});

export default router;
