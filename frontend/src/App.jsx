import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import Signup from "./page/Signup";
import Login from "./page/Login";
import Explore from "./page/AllUsersPage";
import Profile from "./page/Profile";
import { useAuthstore } from "./store/useAuth.store";
import { LoaderCircle } from "lucide-react";
import OtherProfile from "./page/OtherProfile";
import Chats from "./page/Chats";

const App = () => {
	const { authUser, verifyUser, isVerifyingAuth, onlineUsers } = useAuthstore();
	console.log("this is online users",onlineUsers);
	
	useEffect(() => {
		verifyUser();
	}, [verifyUser]);

	if (isVerifyingAuth && !authUser) {
		return (
			<div className=" flex justify-center items-center h-screen text-white">
				<LoaderCircle
					size={100}
					className="animate-spin "
				/>
			</div>
		);
	}
	return (
		<div className="bg-gray-900 flex flex-col text-white h-screen">
			<Navbar></Navbar>
			<div className="<grow">
				<Routes>
					<Route
						path="/"
						element={
							authUser ? <HomePage></HomePage> : <Navigate to="/login" />
						}></Route>
					<Route
						path="/register"
						element={
							!authUser ? <Signup></Signup> : <Navigate to="/" />
						}></Route>
					<Route
						path="/login"
						element={
							authUser ? <Navigate to="/"></Navigate> : <Login></Login>
						}></Route>
					<Route
						path="/explore"
						element={<Explore></Explore>}></Route>
					<Route
						path="/profile"
						element={
							authUser ? <Profile></Profile> : <Navigate to="/login" />
						}></Route>
					<Route
						path="/chats"
						element={
							authUser ? <Chats></Chats> : <Navigate to="/login" />
						}></Route>
					<Route
						path="/:id"
						element={
							authUser ? (
								<OtherProfile></OtherProfile>
							) : (
								<Navigate to="/login" />
							)
						}></Route>
				</Routes>
			</div>
		</div>
	);
};

export default App;
