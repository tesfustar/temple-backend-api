import express from "express";

const router = express.Router();

import {
  createCategory,
  getCategoryForAdmin,
  getCategoryForUser,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "../Controllers/category.js";

router.post("/create", createCategory);
router.get("/admin", getCategoryForAdmin);
router.get("/user", getCategoryForUser);
router.get("/find/:id", getSingleCategory);
router.put("/find/:id", updateCategory);
router.delete("/find/:id", deleteCategory);

export default router;
