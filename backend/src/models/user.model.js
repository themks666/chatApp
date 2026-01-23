import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		userName: {
			type: String,
      unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		profilePic: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true },
);

export const UserModel = new mongoose.model("User", userSchema);
