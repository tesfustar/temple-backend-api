import express from "express";

const router = express.Router();

import {
  createSubCategory,
  getSubCategory,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryForAdmin,
  getAllSubCategoryOfCategory
} from "../Controllers/subCategory.js";

router.post("/create", createSubCategory)
router.get("/", getSubCategory);
router.get("/all/category/:id", getAllSubCategoryOfCategory);
router.get("/admin", getSubCategoryForAdmin); //
router.get("/find/:id", getSingleSubCategory);
router.put("/find/:id", updateSubCategory);
router.delete("/find/:id", deleteSubCategory);

export default router;
