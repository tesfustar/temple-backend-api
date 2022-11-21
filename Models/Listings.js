import mongoose from "mongoose";

const listingsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    description: { type: String, required: true },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    priceNegotiation: { type: String,default:null},
    carDetail: {
      fuelType: { type: String },
      carModel: { type: String },
      condition: { type: String },
      transitionType: { type: String },
    },
    propertyDetail: {
      // type:{type:String,default:"property"},
      bathroom: { type: Number},
      bedroom: { type: Number},
      area: { type: Number}, //in square km
      city: { type: String}, 
      location: { type: String}, //in detail
      isFurnished: { type: Boolean},
    },
    amenities: { type: [String] },
    isFeatured:{type:Boolean,default:false},
    isSoldOut:{type:Boolean,default:false},
    isRequestedForAd:{type:Boolean,default:false},
    isApproved:{type:Boolean,default:false},
    isRejected:{type:Boolean,default:false},
  },
  { timestamps: true }
);

const Listings = mongoose.model("Listings", listingsSchema);

export default Listings;
