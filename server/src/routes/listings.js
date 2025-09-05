import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import Listing from "../models/Listing.js";

const router = Router();

// Create listing
router.post("/", requireAuth, async (req, res) => {
  const listing = await Listing.create({ ...req.body, owner: req.user.id });
  res.status(201).json(listing);
});

// Update listing
router.put("/:id", requireAuth, async (req, res) => {
  const listing = await Listing.findOneAndUpdate({ _id: req.params.id, owner: req.user.id }, req.body, { new: true });
  if (!listing) return res.status(404).json({ message: "Listing not found" });
  res.json(listing);
});

// Delete listing
router.delete("/:id", requireAuth, async (req, res) => {
  const deleted = await Listing.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  if (!deleted) return res.status(404).json({ message: "Listing not found" });
  res.json({ ok: true });
});

// List/search (basic filters)
router.get("/", async (req, res) => {
  const { q, city, country, minPrice, maxPrice, guests } = req.query;
  const filter = {};
  if (q) filter.$text = { $search: q };
  if (city) filter.city = city;
  if (country) filter.country = country;
  if (guests) filter.maxGuests = { $gte: Number(guests) };
  if (minPrice || maxPrice) filter.pricePerNight = { ...(minPrice ? { $gte: Number(minPrice) } : {}), ...(maxPrice ? { $lte: Number(maxPrice) } : {}) };
  const data = await Listing.find(filter).sort({ createdAt: -1 }).limit(100);
  res.json(data);
});

// Detail
router.get("/:id", async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate("owner","name email");
  if (!listing) return res.status(404).json({ message: "Not found" });
  res.json(listing);
});

export default router;
