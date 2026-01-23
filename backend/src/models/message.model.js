import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		reciverId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		image: {
			type: String,
		},
	},
	{ timestamps: true },
);

export const MessageModel = new mongoose.model("Message", messageSchema);
