import { useRef, useState } from "react";
import { useMessageStore } from "../store/messageStore";
import { Images, Send, X } from "lucide-react"; // Imported X for a cleaner UI
import toast from "react-hot-toast";

const Input = () => {
	const [text, setText] = useState("");
	const [imagePreview, setImagePreview] = useState(null);
	const fileInputRef = useRef(null);
	const { sendMessages } = useMessageStore();

	const handleImage = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		// Corrected the check to look for the image prefix
		if (!file.type.startsWith("image/")) {
			toast.error("Please select an image file");
			return;
		}

		const reader = new FileReader();
		reader.onloadend = () => {
			setImagePreview(reader.result);
		};
		reader.readAsDataURL(file);
	};

	const removeImage = () => {
		setImagePreview(null);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const handleSubmitMessage = async (e) => {
		e.preventDefault();

		// Logic fix: Only return if BOTH are empty
		if (!text.trim() && !imagePreview) return;

		try {
			await sendMessages({
				text: text.trim(),
				image: imagePreview,
			});

			// Reset form
			setText("");
			removeImage();
		} catch (error) {
			console.error("Failed to send message:", error);
			toast.error("Failed to send message");
		}
	};

	return (
		<div className="w-full p-4">
			{imagePreview && (
				<div className="mb-3 flex items-center gap-2">
					<div className="relative">
						<img
							src={imagePreview}
							alt="Preview"
							className="w-20 h-20 object-cover rounded-lg border border-gray-700"
						/>
						<button
							type="button"
							onClick={removeImage}
							className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 flex justify-center items-center text-white text-xs">
							<X size={12} />
						</button>
					</div>
				</div>
			)}

			<form
				onSubmit={handleSubmitMessage}
				className="flex items-center gap-2">
				<div className="flex-1 flex bg-gray-800 rounded-lg overflow-hidden">
					<input
						type="file"
						accept="image/*"
						ref={fileInputRef}
						onChange={handleImage}
						className="hidden"
					/>
					<input
						type="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Type a message..."
						className="flex-1 px-4 py-3 bg-transparent outline-none text-white"
					/>
					<button
						type="button"
						className={`px-4 transition-colors ${imagePreview ? "text-green-500" : "text-gray-400 hover:text-white"}`}
						onClick={() => fileInputRef.current?.click()}>
						<Images size={22} />
					</button>
				</div>

				<button
					type="submit"
					disabled={!text.trim() && !imagePreview}
					className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg transition-all">
					<Send
						size={22}
						className="text-white"
					/>
				</button>
			</form>
		</div>
	);
};

export default Input;
