import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
	getAllUser,
	getMessages,
	sendMessage,
} from "../controller/message.controller.js";
const MessageRouter = express.Router();

MessageRouter.get("/users", protectedRoute, getAllUser)
MessageRouter.get("/:messageId", protectedRoute, getMessages)
MessageRouter.post("/send/:receiverId", protectedRoute, sendMessage);

export default MessageRouter;
