import { Link } from "react-router-dom";
import { Settings, User, House, LogIn, User2Icon } from "lucide-react";
import { useAuthstore } from "../store/useAuth.store";

export default function Navbar() {
  const { authUser } = useAuthstore()
	return (
		<header className="sticky flex  text-gray-300  justify-between top-0 z-50 w-full bg-gray-900/80 backdrop-blur">
			<div className="container mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
				<Link
					href="/"
					className="text-xl font-bold tracking-tight">
					<span className="rounded-mde text-white px-2 py-1">
						the
						<span className="text-green-500">mks</span>
					</span>
				</Link>
				<div className="flex items-center gap-4 sm:gap-6">
					<nav className="flex gap-4 sm:gap-6">
						<Link
							to="/"
							className="text-sm  flex flex-col items-center font-medium text-muted-foreground transition-colors hover:text-foreground">
							<House className="size-5" />
							House
						</Link>
						<Link
							to="/profile"
							className="text-sm  flex flex-col items-center font-medium text-muted-foreground transition-colors hover:text-foreground">
							<User className="size-5" />
							Profile
						</Link>
						<Link
							to="/setting"
							className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground flex flex-col items-center">
							<Settings className="size-5" />
							Settings
						</Link>
					</nav>
				</div>
				<div className="flex gap-3 text-sm font-medium text-muted-foreground items-center justify-center">
					<Link
						to="/login"
						className="border hover:bg-green-500 hover:text-black border-green-700 flex gap-3 items-center px-3 py-2 rounded-lg">
						<LogIn></LogIn> Sign In
					</Link>
					<Link
						to="/register"
						className="hover:bg-rose-700 border  border-rose-900 flex gap-3 items-center px-3 py-2 rounded-lg">
						<User2Icon></User2Icon> Sign Up
					</Link>
				</div>
			</div>
		</header>
	);
}
