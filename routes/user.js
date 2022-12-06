import express from "express";

const router = express.Router();

import {
  getAllUsers,
  deleteUser,
  getSingleUser,
  getUserProfileInfo,
  updateUser,
  userInfoData
} from "../Controllers/User.js";

router.get("/all", getAllUsers); ///for dashboard admin
router.get("/find/:id", getSingleUser); ///for dashboard admin
router.get("/profile/:id", userInfoData); ///for dashboard admin
router.delete("/remove/:id", deleteUser);
router.get("/find/profile/:id", getUserProfileInfo); ///for profile web page
router.put("/find/:id", updateUser);
export default router;
