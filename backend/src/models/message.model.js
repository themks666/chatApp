import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		text: {
			type: String
		},
		image: {
			type: String,
		},
	},
	{ timestamps: true },
);

export const MessageModel = new mongoose.model("Message", messageSchema);
