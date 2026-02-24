import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../libs/cloudinary.js";

export const register = async (req, res) => {
	const { email, password, userName } = req.body;
	console.log(req.body);
	if (!email || !password || !userName) {
		return res
			.status(400)
			.json({ success: false, message: "ALL fields are required" });
	}
	try {
		const userExist = await UserModel.findOne({ email });
		if (userExist) {
			return res
				.status(409)
				.json({ success: false, message: "user already Exist" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const userRegister = new UserModel({
			email,
			password: hashedPassword,
			userName,
		});

		await userRegister.save();

		const token = jwt.sign(
			{ userID: userRegister._id },
			process.env.SECRET_KEY,
			{ expiresIn: "7d" },
		);

		const options = {
			maxAge: 7 * 24 * 60 * 60 * 1000,
			samesite: "strict",
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		};

		res.cookie("token", token, options);
		const { password: removed, ...safeUser } = userRegister._doc;
		res.status(200).json({
			success: true,
			user: safeUser,
			message: "user has been registered ",
		});
	} catch (error) {
		console.log("register error", error);

		res.status(500).json({ success: false, message: "internal Server error" });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res
			.status(400)
			.json({ success: false, message: "ALL fields are required" });
	}
	try {
		const user = await UserModel.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "User has not been register" });
		}
		const matchedPassword = await bcrypt.compare(password, user.password);
		if (!matchedPassword) {
			return res
				.status(400)
				.json({ success: false, message: "invalid credentials" });
		}
		const token = jwt.sign({ userID: user._id }, process.env.SECRET_KEY, {
			expiresIn: "7d",
		});

		const options = {
			maxAge: 7 * 24 * 60 * 60 * 1000,
			samesite: "strict",
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		};
		const { password: _, ...safeUser } = user._doc;
		res.cookie("token", token, options);
		res.status(200).json({
			success: true,
			user: safeUser,
			message: "User has been logged in",
		});
	} catch (error) {
		console.log("error in login: ", error);
		res.status(500).json({ success: false, message: "internal Server error" });
	}
};

export const logout = async (_, res) => {
	try {
		res.cookie("token", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out user successfully" });
	} catch (error) {
		console.log("error in login: ", error);
		res.status(500).json({ success: false, message: "internal Server error" });
	}
};

export const updateProfile = async (req, res) => {
	try {
		const { profilePic } = req.body;
		const userId = req.user._id;
		if (!profilePic) {
			console.log("no image found");
			return res
				.status(404)
				.json({ message: "Profile picture must be provided" });
		}

		const uploadResponse = await cloudinary.uploader.upload(profilePic);
		console.log("this is response : \n", uploadResponse);
		const updateUser = await UserModel.findByIdAndUpdate(
			userId,
			{
				profilePic: uploadResponse.secure_url,
			},
			{ new: true },
		);
		res
			.status(200)
			.json({ message: "Profile has been updated", user: updateUser });
	} catch (error) {
		console.log("error in login: ", error);
		res.status(500).json({ success: false, message: "internal Server error" });
	}
};

export const verifyUser = (req, res) => {
	try {
		
		res.status(200).json({ message: "verified", user: req.user });
	} catch (error) {
		console.log("error in verify User: ", error);
		res.status(500).json({ success: false, message: "internal Server error" });
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const userId = req.user._id;
		const allUsers = await UserModel.find({ _id: { $ne: userId } }).select(
			"-password",
		);
		res.status(200).json({ message: "All User", users: allUsers });
	} catch (error) {
		console.log("error in fetching All User: ", error);
		res.status(500).json({ success: false, message: "internal Server error" });
	}
};

export const getSingleUsers = async (req, res) => {
	try {
		const { id } = req.params;
		const singleUsers = await UserModel.findOne({ _id:id }).select(
			"-password",
		);
		res.status(200).json({ message: "single User", user: singleUsers });
	} catch (error) {
		console.log("error in fetching All User: ", error);
		res.status(500).json({ success: false, message: "internal Server error" });
	}
};
