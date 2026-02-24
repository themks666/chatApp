import { Calendar, Mail, User } from "lucide-react";
import { useAuthstore } from "../store/useAuth.store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
	const { selectedUserFun, selectedUser } = useAuthstore();
	const { id } = useParams();

	useEffect(() => {
		selectedUserFun(id);
	}, [id, selectedUserFun]);

	// Loading state / Safety check
	if (!selectedUser) {
		return (
			<div className="h-full flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	const createdDate = new Date(selectedUser.createdAt);

	return (
		<div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
			<div className="max-w-4xl w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row gap-8 p-8">
				{/* Left Side: Profile Image */}
				<div className="relative group mx-auto md:mx-0">
					<img
						src={selectedUser.profilePic || "/default-avatar.png"}
						alt="profile"
						className="w-64 h-80 object-cover rounded-2xl shadow-lg border-2 border-slate-700 transition-transform duration-300 group-hover:scale-[1.02]"
					/>
					<div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none"></div>
				</div>

				{/* Right Side: Content */}
				<div className="flex flex-col justify-center flex-1 space-y-6">
					<div>
						<span className="text-blue-500 font-semibold tracking-widest uppercase text-xs">
							User Profile
						</span>
						<h1 className="text-5xl md:text-7xl capitalize text-white font-black leading-tight">
							{selectedUser.userName}
						</h1>
					</div>

					<div className="space-y-4">
						<div className="flex items-center gap-4 text-slate-300 group">
							<div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600/20 transition-colors">
								<Mail className="w-5 h-5 text-blue-400" />
							</div>
							<span className="text-lg md:text-xl font-medium">
								{selectedUser.email}
							</span>
						</div>

						<div className="flex items-center gap-4 text-slate-300 group">
							<div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600/20 transition-colors">
								<Calendar className="w-5 h-5 text-blue-400" />
							</div>
							<div>
								<p className="text-xs text-slate-500 uppercase tracking-wider">
									Member Since
								</p>
								<span className="text-lg font-medium">
									{createdDate.toLocaleDateString("en-US", {
										month: "long",
										year: "numeric",
									})}
								</span>
							</div>
						</div>
					</div>

					{/* Optional: Add a bio or stats section here */}
					<div className="pt-6 border-t border-slate-800 flex gap-4">
						<div className="text-center">
							<p className="text-white font-bold text-xl">1.2k</p>
							<p className="text-slate-500 text-xs">Messages</p>
						</div>
						<div className="text-center">
							<p className="text-white font-bold text-xl">Active</p>
							<p className="text-slate-500 text-xs">Status</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
