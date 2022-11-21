import mongoose from "mongoose";
const featuredListingSchema = new mongoose.Schema(
  {
    listingId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Listings",
      required: true,
    },
    isAccepted: { type: Boolean, default: false },
    isRejected: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const FeaturedListings = mongoose.model(
  "FeaturedListings",
  featuredListingSchema
);

export default FeaturedListings;
