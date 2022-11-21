import express from "express";

const router = express.Router();

import {
  createListing,
  getAllListings,
  getListings,
  getSingleListingAdmin,
  deleteSingleListingAdmin,
  getAllFeaturedListings,
  getAllFeaturedListingsForAdmin,
  getUnacceptedListings,
  acceptListingRequest,
  rejectListingRequest,
  getOwnListingsData,
  getOwnFeaturedListingsData,
  getSingleListing
} from "../Controllers/Listings.js";

router.post("/create", createListing);
router.get("/", getAllListings);
router.get("/own/:id", getOwnListingsData); //for user to see his own listings
router.get("/own/featured/:id", getOwnFeaturedListingsData); //for user to see his own featured listings
router.get("/admin", getListings);
router.get("/find_one/:id", getSingleListingAdmin); //for admin
router.get("/detail/:id", getSingleListing); //for website
router.get("/featured/admin", getAllFeaturedListingsForAdmin); //for admin
router.get("/featured", getAllFeaturedListings); //for user
router.delete("/find/remove/:id", deleteSingleListingAdmin);
router.get("/admin/unaccepted", getUnacceptedListings); //for admin
router.get('/accept/:id',acceptListingRequest) //for admin
router.get('/reject/:id',rejectListingRequest) //for admin
export default router;
