import mongoose from "mongoose";
export const connect = async () => {
	try {
    console.log("connecting...");
		await mongoose.connect(process.env.DATABASE_URl);
		console.log("connected to the databse");
	} catch (error) {
		console.log("can't connected to the databse \n", error);
	}
};
