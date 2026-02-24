import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuthstore = create((set, get) => ({
	onlineUsers: [],
	authUser: null,
	isVerifyingAuth: false,
	isLoggingIn: false,
	isRegistering: false,
	socket: null,
	isUpdatingProfile: false,
	error: "",
	selectedUser: {},
	selectedUserFun: async (data) => {
		try {
			const res = await axiosInstance.get(`/auth/user/${data}`);
			set({ selectedUser: res.data.user });
			console.log("this is user : ", res.data.user);
		} catch (error) {
			console.log(error);
		}
	},
	verifyUser: async () => {
		try {
			set({ isVerifyingAuth: true });
			const res = await axiosInstance.get("/auth/verify");
			set({ authUser: res.data.user });
			get().connectSocket();
		} catch {
			set({ authUser: null });
		} finally {
			set({ isVerifyingAuth: false });
		}
	},

	signup: async (formData) => {
		try {
			set({ isRegistering: true });
			const res = await axiosInstance.post("/auth/register", formData);
			set({ authUser: res.data.user });
			toast.success("Account created");
			get().connectSocket();
			return res.data.user;
		} catch (err) {
			set({ error: err.response.data.message });
			toast.error(err.response.data.message);
			throw err;
		} finally {
			set({ isRegistering: false });
		}
	},

	login: async (formData) => {
		try {
			set({ isLoggingIn: true });
			const res = await axiosInstance.post("/auth/login", formData);
			set({ authUser: res.data.user });
			toast.success("Successfully logged in");
			get().connectSocket();
		} catch (err) {
			console.error(err);
			set({ error: err.response.data.message });
			toast.error(err.response.data.message);
			throw err;
		} finally {
			set({ isLoggingIn: false });
		}
	},
	logout: async () => {
		await axiosInstance.post("/auth/logout");
		set({ authUser: null });
		get().disconnectSocket();
	},

	updateProfile: async (profilePic) => {
		try {
			set({ isUpdatingProfile: true });
			let response = await axiosInstance.put(
				"/auth/update-profile",
				profilePic,
			);
			toast.success("profile picture updated");
			set({ authUser: response.data.user });
			console.log(authUser);
		} catch (err) {
			console.log(err.response);

			toast.error(err.response.data.message);
			set({ error: err.response.data.message });
		} finally {
			set({ isUpdatingProfile: false });
		}
	},
	connectSocket: () => {
		const { authUser } = get();
		if (!authUser || get().socket?.connected) return;
		const socket = io("http://localhost:3000", {
			query: {
				userId: authUser._id,
			},
		});
		console.log("connected to the database");
		socket.connect();
		console.log(socket);
		set({ socket });
		socket.on("getConnectedUsers", (users) => {
			set({ onlineUsers: users });
		});
	},
	disconnectSocket: () => {
		if (get().socket?.connected) get().socket.disconnect();
	},
}));
