import express from "express";

const router = express.Router();

import {
  getAllNotification,
  getUnreadNotification,
  markAsReadNotification,
  sendNotification,
  markAllAsReadNotification,
  getAllAdminNotification,
  getAllUnreadAdminNotification,
  markAllAsReadNotificationForAdmin
} from "../Controllers/Notification.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../Middleware/authorization.js";

router.get("/company/:id", getAllNotification);
router.get("/admin/:userId", getAllAdminNotification);//admin
router.get("/unread/:id", getUnreadNotification);
router.get("/admin/unread/:userId", getAllUnreadAdminNotification);
router.get("/mark/:id", markAsReadNotification);
router.post("/send", sendNotification);
router.get("/mark/all/unread/:id", markAllAsReadNotification);
router.get("/admin/all/unread/:id", markAllAsReadNotificationForAdmin);
export default router;
