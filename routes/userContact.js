import express from "express";

const router = express.Router();

import {
  createSocialContactInfo,
  getOwnContactInfo
} from "../Controllers/UserContact.js";

router.post("/create", createSocialContactInfo);
router.post("/find/:id", getOwnContactInfo);
export default router;
