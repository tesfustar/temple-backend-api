import express from "express";

const router = express.Router();

import {
  createBanks,
  getBanksForAdmin,
  getBanksForUser
} from "../Controllers/Banks.js";

router.post("/create", createBanks);
router.get("/admin", getBanksForAdmin);
router.get("/user", getBanksForUser);


export default router;
