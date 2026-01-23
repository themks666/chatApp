import { create } from "zustand";
import { axiosInstance } from "../libs/axios";

export const useAuthstore = create((set) => ({
	authUser: null,
	isVerifyingAuth: false,
	isLoggingIn: false,
	isResistering: false,
	isUpdatingProfile: false,
	verifyUser: async () => {
		try {
      set({isVerifyingAuth: true})
			const response = await axiosInstance.get("/auth/verify");
			set({ authUser: response.data.user });
		} catch (error) {
      console.log("this is the error : ",error);
      
			set({ authUser: null });
		} finally {
			set({ isVerifyingAuth: false });
		}
	},
}));
