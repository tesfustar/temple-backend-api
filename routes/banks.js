import express from "express";

const router = express.Router();

import {
  createBanks,
  getBanksForAdmin,
  getBanksForUser,
  deleteBank,
  updateBank,
} from "../Controllers/Banks.js";

router.post("/create", createBanks);
router.get("/admin", getBanksForAdmin);
router.get("/user", getBanksForUser);
router.delete("/find/:id", deleteBank);
router.put("/find/:id", updateBank);

export default router;
