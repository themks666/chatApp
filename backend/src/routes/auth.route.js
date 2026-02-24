import express from "express";
import {
	getAllUsers,
	login,
	logout,
	register,
	updateProfile,
	verifyUser,
	getSingleUsers,
} from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
const AuthRouter = express();
AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/logout", logout);
AuthRouter.put("/update-profile", protectedRoute, updateProfile);
AuthRouter.get("/verify", protectedRoute, verifyUser);
AuthRouter.get("/users", protectedRoute, getAllUsers);
AuthRouter.get("/user/:id", protectedRoute, getSingleUsers);
export default AuthRouter;
