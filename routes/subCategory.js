import express from "express";

const router = express.Router();

import {
  createSubCategory,
  getSubCategory,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryForAdmin
} from "../Controllers/subCategory.js";

router.post("/create", createSubCategory)
router.get("/", getSubCategory);
router.get("/admin", getSubCategoryForAdmin); //
router.get("/find/:id", getSingleSubCategory);
router.put("/find/:id", updateSubCategory);
router.delete("/find/:id", deleteSubCategory);

export default router;
