import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../libs/axios";
import { KeyRound, Mail } from "lucide-react";

const Login = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axiosInstance.post("/auth/login", formData, {
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			});

			navigate("/");
		} catch (error) {
			console.log(error);
			setError(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="h-full bg-gray-950 w-full flex items-center justify-center p-4">
			<div className="shadow-inner shadow-gray-600  rounded-lg p-8 w-full max-w-96">
				<h2 className="text-3xl font-bold text-center text-gray-400 mb-6">Welcome Back</h2>
				<p className="text-center my-5 text-lg text-gray-300">we glad that you are here again.</p>
				{error ? (
					<p className="bg-rose-500/30 p-3 rounded-xl text-rose-900 text-xl">
						{error}
					</p>
				) : null}
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-4">
					<div className="flex flex-col gap-4  mx-3">
						<label
							htmlFor="email"
							className="font-medium text-lg">
							Email
						</label>
						<div className="flex items-center  py-2 px-3 rounded-lg bg-gray-900">
							<Mail></Mail>
							<input
								type="text"
								id="email"
								name="email"
								placeholder="Email"
								className="px-5 py-2"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
					<div className="flex flex-col gap-4 mx-3">
						<label
							htmlFor="password"
							className="font-medium text-lg">
							Password
						</label>
						<div className="flex items-center py-2 px-3 rounded-lg bg-gray-900">
							<KeyRound></KeyRound>

							<input
								type="text"
								id="password"
								name="password"
								placeholder="Password"
								className="focus:bg-black py-2 px-5"
								value={formData.password}
								onChange={handleChange}
								required
							/>
						</div>
					</div>

					<p className="px-3 font-medium">
						Don't Have an Account ?
						<Link
							className="text-blue-700 font-medium"
							to="/register">
							{" "}
							sign up{" "}
						</Link>
					</p>
					<button
						type="submit"
						className="bg-green-500/70 py-2 my-4 rounded-lg text-xl text-white">
						{loading ? "loading..." : "Sign Up"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
