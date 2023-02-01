import express from "express";

const router = express.Router();

import {
  createFeaturedListingAd,
  acceptFeaturedListingRequest,
  rejectFeaturedListingRequest,
  getAllListingRequest,
  getMyListingRequest,
  deleteMyListingRequest
} from "../Controllers/FeaturedListings.js";
// import {
//     verifyTokenAndAdmin,
//     verifyTokenAndCompanyAdmin,
//     verifyTokenAndAuthorization,
//   } from "../Middleware/authorization.js";

router.post("/create", createFeaturedListingAd);
router.put("/accept/:id", acceptFeaturedListingRequest);
router.put("/reject/:id", rejectFeaturedListingRequest);
router.get("/admin/all", getAllListingRequest);  //for admin
router.get("/user/all/:id", getMyListingRequest);
router.delete("/user/find/:id", deleteMyListingRequest);
export default router;
