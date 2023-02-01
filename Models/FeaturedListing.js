import mongoose from "mongoose";
const featuredListingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    listingId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Listings",
      required: true,
    },
    bankId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Banks",
      required: true,
    },
    sender: { type: String },
    tinNumber: { type: String },
    amountMoney: { type: Number },
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
