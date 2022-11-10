import express from "express";

const router = express.Router();

import {
  createListing,
  getAllListings,
  getListings,
  getSingleListingAdmin
} from "../Controllers/Listings.js";

router.post("/create", createListing);
router.get("/", getAllListings);
router.get("/admin", getListings);
router.get("/find_one/:id", getSingleListingAdmin); //for admin
// router.put("/find/:id", updateCategory);
// router.delete("/find/:id", deleteCategory);

export default router;
