import { useEffect, useRef } from "react";
import { useMessageStore } from "../store/messageStore";
import { useAuthstore } from "../store/useAuth.store";
import Input from "../components/Input";

const Chats = () => {
	const {
		messages,
		selectedUserId,
		getMessages,
		listenMessages,
		dontListenMessages,
	} = useMessageStore();

	const { authUser } = useAuthstore();

	// Anchor div used for smooth scrolling
	const bottomRef = useRef(null);

	const scrollToBottom = () => {
		if (!bottomRef.current) return;
		bottomRef.current.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		if (!selectedUserId) return;

		getMessages(selectedUserId);
		listenMessages();

		return () => dontListenMessages();
	}, [selectedUserId]);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div className="flex flex-col h-full w-full max-w-4xl mx-auto bg-slate-900 shadow-xl">
			<div
				
				className="flex-1 overflow-y-auto p-4 space-y-4">
				{messages.map((message) => {
					const isSentByMe = String(message.senderId) === String(authUser._id);

					return (
						<div
							ref={bottomRef}
							key={message._id}
							className={`flex w-full ${
								isSentByMe ? "justify-end" : "justify-start"
							}`}>
							<div
								className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-md ${
									isSentByMe
										? "bg-blue-600 text-white rounded-tr-none"
										: "bg-rose-600 text-white rounded-tl-none"
								}`}>
								{message.image && (
									<img
										src={message.image}
										className="rounded-lg mb-2 max-w-full h-auto"
										alt="sent"
									/>
								)}

								{message.text && (
									<p className="text-sm break-words">{message.text}</p>
								)}

								<p className="text-[10px] mt-1 opacity-60 text-right">
									{message.createdAt
										? new Date(message.createdAt).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											})
										: "Just now"}
								</p>
							</div>
						</div>
					);
				})}

				{/* SCROLL ANCHOR */}
				<div ref={bottomRef}></div>
			</div>

			<div className="p-4 bg-slate-800">
				<Input scrollToBottom={scrollToBottom} />
			</div>
		</div>
	);
};

export default Chats;
