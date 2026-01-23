import express from "express";
import {
	login,
	logout,
	register,
	updateProfile,
	verifyUser,
} from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
const AuthRouter = express();
AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/logout", logout);
AuthRouter.put("/update-profile", protectedRoute, updateProfile);
AuthRouter.get("/verify", protectedRoute, verifyUser);
export default AuthRouter;
