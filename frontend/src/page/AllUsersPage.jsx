import { useEffect, useState } from "react";
import { axiosInstance } from "../libs/axios";
import {
	LoaderCircle,
	Mail,
	User,
	MessageSquare,
	ExternalLink,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMessageStore } from "../store/messageStore";

const UserCard = ({ user, id }) => {
	const navigate = useNavigate();
	const { selectUser } = useMessageStore();

	return (
		<div className="group bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] flex flex-col">
			{/* Image Container */}
			<div className="relative aspect-[3/4] overflow-hidden">
				<img
					src={user.profilePic || "/avatar.svg"}
					alt={user.userName}
					className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
			</div>

			{/* Content */}
			<div className="p-5 space-y-4">
				<div>
					<h3 className="flex items-center gap-2 text-lg font-bold text-white capitalize truncate">
						<User
							size={18}
							className="text-blue-400"
						/>
						{user.userName}
					</h3>
					<p className="flex items-center gap-2 text-sm text-slate-400 truncate mt-1">
						<Mail size={14} />
						{user.email}
					</p>
				</div>

				{/* Action Buttons */}
				<div className="flex gap-3">
					<Link
						to={`/${id}`}
						className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl transition-colors">
						<ExternalLink size={16} />
						View
					</Link>
					<button
						onClick={() => {
							selectUser(id);
							navigate("/chats");
						}}
						className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/20">
						<MessageSquare size={16} />
						Chat
					</button>
				</div>
			</div>
		</div>
	);
};

const Setting = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { isUsersLoading } = useMessageStore();

	useEffect(() => {
		const fetchAllUsers = async () => {
			try {
				const res = await axiosInstance.get("/auth/users");
				setUsers(res.data.users);
			} catch (err) {
				setError("Failed to load users. Please check your connection.");
			} finally {
				setLoading(false);
			}
		};
		fetchAllUsers();
	}, []);

	if (loading || isUsersLoading) {
		return (
			<div className="h-[60vh] w-full flex flex-col justify-center items-center gap-4">
				<LoaderCircle className="animate-spin text-blue-500 size-12" />
				<p className="text-slate-400 animate-pulse">Fetching users...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="h-[60vh] flex items-center justify-center">
				<div className="text-center p-8 bg-red-500/10 border border-red-500/20 rounded-2xl">
					<p className="text-red-400 font-medium">{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-6">
			<header className="mb-10">
				<h1 className="text-3xl font-black text-white">Discover People</h1>
				<p className="text-slate-400 mt-2">
					Connect with other users in the community.
				</p>
			</header>

			{users.length === 0 ? (
				<p className="text-center text-slate-500 py-20">No users found.</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{users.map((user) => (
						<UserCard
							key={user._id}
							user={user}
							id={user._id}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Setting;
