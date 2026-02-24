import { Calendar, Camera, Loader, Mail, User } from "lucide-react";
import { useAuthstore } from "../store/useAuth.store";
import { useState } from "react";

const Profile = () => {
	const [selectedImage, setSelectedImage] = useState(null);
	const { authUser, isUpdatingProfile, updateProfile } = useAuthstore();

	const createdDate = new Date(authUser.createdAt);

	const handleImageUpload = async (e) => {
		try {
			const file = e.target.files[0];
			if (!file) return;

			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = async () => {
				const base64Image = reader.result;
				setSelectedImage(base64Image);
				await updateProfile({ profilePic: base64Image });
			};
		} catch (error) {
			console.error("Upload error:", error);
		}
	};

	return (
		<div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
			<div className="max-w-4xl w-full bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 shadow-2xl">
				<div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
					{/* Left: Image Section with Overlay */}
					<div className="relative group">
						<div className="relative w-64 h-80 rounded-2xl overflow-hidden ring-4 ring-slate-800 group-hover:ring-blue-500/50 transition-all duration-300">
							<img
								src={selectedImage || authUser.profilePic || "/avatar.svg"}
								alt="Profile"
								className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 ${
									isUpdatingProfile ? "opacity-50 blur-sm" : ""
								}`}
							/>

							{/* Upload Overlay */}
							<label
								htmlFor="imageInput"
								className={`absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${
									isUpdatingProfile ? "cursor-not-allowed" : ""
								}`}>
								{isUpdatingProfile ? (
									<Loader className="w-10 h-10 text-white animate-spin" />
								) : (
									<>
										<Camera className="w-10 h-10 text-white mb-2" />
										<span className="text-white text-xs font-medium">
											Change Photo
										</span>
									</>
								)}
								<input
									type="file"
									id="imageInput"
									className="hidden"
									accept="image/*"
									onChange={handleImageUpload}
									disabled={isUpdatingProfile}
								/>
							</label>
						</div>

						{/* Status Badge */}
						<div className="absolute -bottom-3 -right-3 bg-green-500 h-6 w-6 rounded-full border-4 border-slate-900 shadow-lg"></div>
					</div>

					{/* Right: Info Section */}
					<div className="flex-1 space-y-8 w-full">
						<div className="text-center md:text-left">
							<p className="text-blue-400 font-mono text-sm tracking-widest uppercase mb-2">
								My Account
							</p>
							<h1 className="text-6xl md:text-7xl font-black text-white capitalize tracking-tight break-words">
								{authUser.userName}
							</h1>
						</div>

						<div className="space-y-4 bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
							<div className="flex items-center gap-4 text-slate-300">
								<div className="p-3 bg-slate-900 rounded-xl">
									<Mail className="w-5 h-5 text-blue-400" />
								</div>
								<div>
									<p className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">
										Email Address
									</p>
									<p className="text-lg">{authUser.email}</p>
								</div>
							</div>

							<div className="flex items-center gap-4 text-slate-300">
								<div className="p-3 bg-slate-900 rounded-xl">
									<Calendar className="w-5 h-5 text-blue-400" />
								</div>
								<div>
									<p className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">
										Member Since
									</p>
									<p className="text-lg">
										{createdDate.toLocaleDateString("en-US", {
											day: "numeric",
											month: "long",
											year: "numeric",
										})}
									</p>
								</div>
							</div>
						</div>

						{/* Account Settings Footer */}
						<div className="flex gap-4">
							<div className="flex-1 text-center p-3 rounded-xl bg-slate-800/50 border border-slate-700">
								<p className="text-white font-bold">Account Status</p>
								<p className="text-green-400 text-sm">Verified</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
