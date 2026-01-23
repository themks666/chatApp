import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		if (!decoded) {
			return (res.status(401), json({ message: "Unauthorized" }));
		}
		const decodedUser = await UserModel.findById(decoded.userID, { password: 0 });
		if (!decodedUser) {
			return res.status(404).json({ message: "Unauthorized" });
		}
    req.user = decodedUser
    next()
	} catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
    
  }
};
