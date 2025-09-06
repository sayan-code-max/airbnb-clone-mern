// import mongoose from "mongoose";
// import Listing from "./models/Listing.js";
// import User from "./models/User.js";

// async function seed() {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/airbnb-clone");

//     console.log("Connected to MongoDB");

//     // make sure at least one user exists (to use as owner)
//     let user = await User.findOne();
//     if (!user) {
//       user = await User.create({
//         name: "Demo User",
//         email: "demo@example.com",
//         password: "password123", // should be hashed normally
//       });
//       console.log("Created demo user:", user.email);
//     }

//     // clear old listings
//     await Listing.deleteMany({});
//     console.log("Cleared old listings");

//     // demo listings
//     const demoListings = [
//       {
//         title: "Modern Apartment in City Center",
//         description: "A cozy apartment close to everything.",
//         address: "123 Main Street",
//         city: "Kolkata",
//         country: "India",
//         pricePerNight: 2500,
//         maxGuests: 2,
//         amenities: ["WiFi", "Kitchen", "AC"],
//         images: [],
//       },
//       {
//         title: "Luxury Beach House",
//         description: "Relax in a beautiful beachside villa.",
//         address: "456 Ocean Drive",
//         city: "Goa",
//         country: "India",
//         pricePerNight: 6000,
//         maxGuests: 6,
//         amenities: ["Pool", "WiFi", "Sea View"],
//         images: [],
//       },
//       {
//         title: "Mountain Cabin Retreat",
//         description: "Peaceful cabin surrounded by nature.",
//         address: "789 Hilltop Road",
//         city: "Manali",
//         country: "India",
//         pricePerNight: 4000,
//         maxGuests: 4,
//         amenities: ["Fireplace", "Balcony"],
//         images: [],
//       },
//       {
//         title: "Business Hotel Room",
//         description: "Perfect for a short business trip.",
//         address: "15 Tech Park",
//         city: "Bangalore",
//         country: "India",
//         pricePerNight: 3500,
//         maxGuests: 2,
//         amenities: ["WiFi", "Desk", "Breakfast"],
//         images: [],
//       },
//       {
//         title: "Traditional Homestay",
//         description: "Stay with a local family and enjoy home-cooked meals.",
//         address: "22 Village Road",
//         city: "Jaipur",
//         country: "India",
//         pricePerNight: 1500,
//         maxGuests: 3,
//         amenities: ["Meals Included", "WiFi"],
//         images: [],
//       },
//       {
//         title: "Riverside Cottage",
//         description: "Enjoy a quiet stay by the river.",
//         address: "9 Riverside Lane",
//         city: "Rishikesh",
//         country: "India",
//         pricePerNight: 2800,
//         maxGuests: 2,
//         amenities: ["Yoga Deck", "WiFi"],
//         images: [],
//       },
//       {
//         title: "Luxury Penthouse",
//         description: "Top-floor penthouse with stunning views.",
//         address: "Skyline Tower",
//         city: "Mumbai",
//         country: "India",
//         pricePerNight: 12000,
//         maxGuests: 4,
//         amenities: ["Private Pool", "Gym", "WiFi"],
//         images: [],
//       },
//       {
//         title: "Desert Camp",
//         description: "Stay under the stars in the desert.",
//         address: "Thar Desert",
//         city: "Jaisalmer",
//         country: "India",
//         pricePerNight: 1800,
//         maxGuests: 2,
//         amenities: ["Campfire", "Camel Ride"],
//         images: [],
//       },
//       {
//         title: "Houseboat Experience",
//         description: "Sleep on a floating house in backwaters.",
//         address: "Backwaters",
//         city: "Alleppey",
//         country: "India",
//         pricePerNight: 5000,
//         maxGuests: 4,
//         amenities: ["Meals", "WiFi", "Air Conditioning"],
//         images: [],
//       },
//       {
//         title: "Forest Treehouse",
//         description: "Live among the trees in a wooden house.",
//         address: "Jungle Area",
//         city: "Wayanad",
//         country: "India",
//         pricePerNight: 3500,
//         maxGuests: 2,
//         amenities: ["Balcony", "WiFi", "Breakfast"],
//         images: [],
//       },
//     ];

//     // attach owner to each listing
//     const listingsWithOwner = demoListings.map(l => ({
//       ...l,
//       owner: user._id,
//     }));

//     await Listing.insertMany(listingsWithOwner);

//     console.log("Inserted demo listings ✅");
//     process.exit();
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// }

// seed();





























import mongoose from "mongoose";
import dotenv from "dotenv";
import Listing from "./models/Listing.js";
import User from "./models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  try {
  await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear old data
    await Listing.deleteMany({});
    console.log("🗑️ Old listings removed");

    // Get any user as owner (or create one)
    let user = await User.findOne();
    if (!user) {
      user = await User.create({
        name: "Demo User",
        email: "demo@example.com",
        passwordHash: "password123", // plain for demo
      });
    }

    // Sample listings (10 demo listings with images)
    const listings = [
      {
        owner: user._id,
        title: "Modern Apartment in City Center",
        description: "A cozy apartment close to everything.",
        address: "123 Main Street",
        city: "Kolkata",
        country: "India",
        pricePerNight: 2500,
        maxGuests: 2,
        amenities: ["WiFi", "Kitchen", "AC"],
        images: ["https://images.unsplash.com/photo-1560448075-bb4f9eaa0a7e"],
      },
      {
        owner: user._id,
        title: "Luxury Beach House",
        description: "Relax in a beautiful beachside villa.",
        address: "456 Ocean Drive",
        city: "Goa",
        country: "India",
        pricePerNight: 6000,
        maxGuests: 6,
        amenities: ["Pool", "WiFi", "Sea View"],
        images: ["https://images.unsplash.com/photo-1507089947368-19c1da9775ae"],
      },
      {
        owner: user._id,
        title: "Mountain Cabin Retreat",
        description: "Peaceful cabin surrounded by nature.",
        address: "789 Hilltop Road",
        city: "Manali",
        country: "India",
        pricePerNight: 4000,
        maxGuests: 4,
        amenities: ["Fireplace", "Balcony"],
        images: ["https://images.unsplash.com/photo-1505691938895-1758d7feb511"],
      },
      {
        owner: user._id,
        title: "Business Hotel Room",
        description: "Perfect for a short business trip.",
        address: "15 Tech Park",
        city: "Bangalore",
        country: "India",
        pricePerNight: 3500,
        maxGuests: 2,
        amenities: ["WiFi", "Desk", "Breakfast"],
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"],
      },
      {
        owner: user._id,
        title: "Traditional Homestay",
        description: "Stay with a local family and enjoy home-cooked meals.",
        address: "22 Village Road",
        city: "Jaipur",
        country: "India",
        pricePerNight: 1500,
        maxGuests: 3,
        amenities: ["Meals Included", "WiFi"],
        images: ["https://images.unsplash.com/photo-1505691723518-36a0f673b15c"],
      },
      {
        owner: user._id,
        title: "Riverside Cottage",
        description: "Enjoy a quiet stay by the river.",
        address: "9 Riverside Lane",
        city: "Rishikesh",
        country: "India",
        pricePerNight: 2800,
        maxGuests: 2,
        amenities: ["Yoga Deck", "WiFi"],
        images: ["https://images.unsplash.com/photo-1505691938895-1758d7feb511"],
      },
      {
        owner: user._id,
        title: "Luxury Penthouse",
        description: "Top-floor penthouse with stunning views.",
        address: "Skyline Tower",
        city: "Mumbai",
        country: "India",
        pricePerNight: 12000,
        maxGuests: 4,
        amenities: ["Private Pool", "Gym", "WiFi"],
        images: ["https://images.unsplash.com/photo-1507089947368-19c1da9775ae"],
      },
      {
        owner: user._id,
        title: "Desert Camp",
        description: "Stay under the stars in the desert.",
        address: "Thar Desert",
        city: "Jaisalmer",
        country: "India",
        pricePerNight: 1800,
        maxGuests: 2,
        amenities: ["Campfire", "Camel Ride"],
        images: ["https://images.unsplash.com/photo-1505691938895-1758d7feb511"],
      },
      {
        owner: user._id,
        title: "Houseboat Experience",
        description: "Sleep on a floating house in backwaters.",
        address: "Backwaters",
        city: "Alleppey",
        country: "India",
        pricePerNight: 5000,
        maxGuests: 4,
        amenities: ["Meals", "WiFi", "Air Conditioning"],
        images: ["https://images.unsplash.com/photo-1507089947368-19c1da9775ae"],
      },
      {
        owner: user._id,
        title: "Forest Treehouse",
        description: "Live among the trees in a wooden house.",
        address: "Jungle Area",
        city: "Wayanad",
        country: "India",
        pricePerNight: 3500,
        maxGuests: 2,
        amenities: ["Balcony", "WiFi", "Breakfast"],
        images: ["https://images.unsplash.com/photo-1505691723518-36a0f673b15c"],
      },
    ];

    await Listing.insertMany(listings);
    console.log("✅ Listings seeded:", listings.length);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

seed();
