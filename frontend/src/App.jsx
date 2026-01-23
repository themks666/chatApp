import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import Signup from "./page/Signup";
import Login from "./page/Login";
import Setting from "./page/Setting";
import Profile from "./page/Profile";
import { useAuthstore } from "./store/useAuth.store";
import { LoaderCircle } from "lucide-react";

const App = () => {
	const { authUser, verifyUser, isVerifyingAuth } = useAuthstore();
	useEffect(() => {
		verifyUser();
	}, [verifyUser]);
	console.log(authUser);
	if (isVerifyingAuth && !authUser) {
		return (
			<div className="bg-black flex justify-center items-center h-screen text-white">
				{" "}
				<LoaderCircle size={100} className="animate-spin "/>
			</div>
		);
	}
	return (
		<div className="bg-gray-950 text-white h-screen overflow-hidden">
			<Navbar></Navbar>
			<Routes>
				<Route
					path="/"
					element={
						authUser ? <HomePage></HomePage> : <Navigate to="/login" />
					}></Route>
				<Route
					path="/register"
					element={!authUser?<Signup></Signup>: <Navigate to="/"/>}></Route>
				<Route
					path="/login"
					element={authUser?<Navigate to="/"></Navigate>:<Login></Login>}></Route>
				<Route
					path="/setting"
					element={<Setting></Setting>}></Route>
				<Route
					path="/profile"
					element={authUser?<Profile></Profile>: <Navigate to="/login"/>}></Route>
			</Routes>
		</div>
	);
};

export default App;
