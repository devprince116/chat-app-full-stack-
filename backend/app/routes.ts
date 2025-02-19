import express from "express";
import authRoutes from "./auth/auth.route";
import adminRoutes from "./admin/admin.route";
import chatRoutes from "./chats/chat.route";
import groupRoutes from "./group-chat/group.routes";
import userRoutes from "./user/user.route";
// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/group", groupRoutes);
router.use("/chat", chatRoutes);
router.use("/admin", adminRoutes);
router.use("/auth", authRoutes);

export default router;
