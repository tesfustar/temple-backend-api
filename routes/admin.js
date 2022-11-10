import express from "express";

const router = express.Router();

import {
 getAllStatus
} from "../Controllers/Admin.js";

router.get("/dashboard", getAllStatus);
// router.post("/signup", signUp);

export default router;
