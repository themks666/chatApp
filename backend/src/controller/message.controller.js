import cloudinary from "../libs/cloudinary.js";
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
		const message = await MessageModel.find({
			$or: [
				{ senderId, receiverId: messageId },
				{ senderId: messageId, receiverId: senderId },
			],
		});
		res.status(200).json({ success: true, message });
	} catch (error) {
		console.log("error in finding chat messages: ", error);
		res.status(500).json({ success: false, message: "internal Server error" });
	}
};
export const sendMessage = async (req, res) => {
  const { text, image } = req.body
	try {
		const { receiverId } = req.params;
		const senderId = req.user._id;
    let imageUri;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image)
      imageUri = uploadResponse.secure_url
    }


    const newMessage = new MessageModel({
      senderId,
      receiverId,
      text,
      image: imageUri
    })

    await newMessage.save()
		res.status(201).json({ success: true, message: "message has been saved" });
	} catch (error) {
		console.log("error in finding chat messages: ", error);
		res.status(500).json({ success: false, message: "internal Server error" });
	}
};
