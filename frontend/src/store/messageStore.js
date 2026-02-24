import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import toast from "react-hot-toast";
import { useAuthstore } from "./useAuth.store.js";

export const useMessageStore = create((set, get) => ({
	messages: [],
	users: [],
	selectedUserId: null,
	isUsersLoading: false,
	isMessageLoading: false,

	getUsers: async () => {
		set({ isUsersLoading: true });
		try {
			const response = await axiosInstance.get("/messages/users");
			set({ users: response.data.users });
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			set({ isUsersLoading: false });
		}
	},

	sendMessages: async (messageData) => {
		const { selectedUserId, messages } = get();

		try {
			const response = await axiosInstance.post(
				`/messages/send/${selectedUserId}`,
				messageData,
			);

			const realMessage = response.data.message;

			// Normalize IDs
			realMessage.senderId = String(realMessage.senderId);
			realMessage.receiverId = String(realMessage.receiverId);

			// Add message to state
			set({ messages: [...messages, realMessage] });
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to send");
		}
	},

	getMessages: async (userId) => {
		set({ isMessageLoading: true });

		try {
			const response = await axiosInstance(`/messages/${userId}`);
			const msgs = response.data.messages.map((m) => ({
				...m,
				senderId: String(m.senderId),
				receiverId: String(m.receiverId),
			}));

			set({ messages: msgs });
		} catch (error) {
			toast.error(error.response.data.messages);
			console.log(error);
		} finally {
			set({ isMessageLoading: false });
		}
	},

	listenMessages: () => {
		const { selectedUserId } = get();
		if (!selectedUserId) return;

		const socket = useAuthstore.getState().socket;

		socket.on("newMessage", (newMessage) => {
			// Normalize IDs
			newMessage.senderId = String(newMessage.senderId);
			newMessage.receiverId = String(newMessage.receiverId);

			const isForThisChat =
				newMessage.senderId === selectedUserId ||
				newMessage.receiverId === selectedUserId;

			if (!isForThisChat) return;

			set({
				messages: [...get().messages, newMessage],
			});
		});
	},

	dontListenMessages: () => {
		const socket = useAuthstore.getState().socket;
		socket.off("newMessage");
	},

	selectUser: (id) => {
		set({ selectedUserId: id });
	},
}));
