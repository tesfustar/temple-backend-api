import express from "express";

const router = express.Router();

import {
  getAllUsers,deleteUser
} from "../Controllers/User.js";

router.get("/all", getAllUsers);///for dashboard adminff
router.delete("/remove/:id", deleteUser);

export default router;
