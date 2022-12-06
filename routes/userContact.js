import express from "express";

const router = express.Router();

import {
  createSocialContactInfo,
  getOwnContactInfo
} from "../Controllers/UserContact.js";

router.post("/create/:id", createSocialContactInfo);
router.get("/find/:id", getOwnContactInfo);
export default router;
