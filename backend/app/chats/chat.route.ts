import express from "express";
import * as chatController from "./chat.controller";
import { authenticate } from "../common/middleware/auth.middleware";
// routes
const router = express.Router();

router.post("/", authenticate, chatController.sendMessage);
router.post("/grp-chat", authenticate, chatController.sendGroupMessage).get("/:receiverId", authenticate, chatController.getPrivateMessages).get("/:groupId", authenticate, chatController.getGroupMessages);


export default router;
