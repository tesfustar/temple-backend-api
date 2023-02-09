import express from "express";

const router = express.Router();

import {
  getAllStatus,
  getCategoryDetail,
  getSubCategoryDetail,
  createSocialContactInfo,
  getOwnContactInfo,
  getFeaturedAmountInfo //for user
} from "../Controllers/Admin.js";

router.get("/dashboard", getAllStatus);
router.get("/category-detail/:id", getCategoryDetail);
router.get("/subcategory-detail/:id", getSubCategoryDetail);
router.get("/social-contact/find/:id", getOwnContactInfo);
router.get("/featured-amount", getFeaturedAmountInfo);
router.post("/social-contact/create", createSocialContactInfo)
export default router;
