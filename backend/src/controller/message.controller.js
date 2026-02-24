import cloudinary from "../libs/cloudinary.js";
import { getReceiverId, io } from "../libs/socket.js";
import { MessageModel } from "../models/message.model.js";
import { UserModel } from "../models/user.model.js";

export const getAllUser = async (req, res) => {
	try {
		const userLoggedIn = req.user._id;
		const allUserExceptLoggedIn = await UserModel.find(
			{
				_id: { $ne: userLoggedIn },
			},
			{ password: 0 },
		);
		res.status(200).json({ success: true, alluser: allUserExceptLoggedIn });
	} catch (error) {
		console.log("error in verify User: ", error);
		res.status(500).json({ success: false, message: "internal Server error" });
	}
};


export const getMessages = async (req, res) => {
  try {
    const { messageId } = req.params;
    const senderId = req.user._id;

    const messages = await MessageModel.find({ // Rename variable to plural
      $or: [
        { senderId, receiverId: messageId },
        { senderId: messageId, receiverId: senderId },
      ],
    });
    
    
    res.status(200).json({ success: true, messages }); 
  } catch (error) {
    console.log("error in finding chat messages: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const sendMessage = async (req, res) => {
	const { text, image } = req.body;

	try {
		const { receiverId } = req.params;
		const senderId = req.user._id;
		console.log("receiver id ", receiverId, "sender id", senderId);

		let imageUri;
		if (image) {
			const uploadResponse = await cloudinary.uploader.upload(image);
			imageUri = uploadResponse.secure_url;
		}
		const newMessage = new MessageModel({
			senderId,
			receiverId,
			text,
			image: imageUri,
		});

		await newMessage.save();
		const receiverSocketId = getReceiverId(receiverId)
		if(receiverSocketId){
			io.to(receiverSocketId).emit("newMessage", newMessage)
		}
		res.status(201).json({ success: true, message: newMessage });
	} catch (error) {
		console.log("error in finding chat messages: ", error);
		res.status(500).json({ success: false, message: "internal Server error" });
	}
};
