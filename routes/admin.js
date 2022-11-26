import express from "express";

const router = express.Router();

import {
 getAllStatus,getCategoryDetail,getSubCategoryDetail
} from "../Controllers/Admin.js";

router.get("/dashboard", getAllStatus);
router.get("/category-detail/:id", getCategoryDetail);
router.get("/subcategory-detail/:id", getSubCategoryDetail);
export default router;
