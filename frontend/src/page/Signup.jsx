import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, KeyRound, Mail, User } from "lucide-react";
import { useAuthstore } from "../store/useAuth.store";

const Login = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const { signup, isRegistering } = useAuthstore();
	const [formData, setFormData] = useState({
		email: "",
    userName:"",
		password: "",
	});
	const [error, setError] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		try {
			signup(formData);
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
			<div className="shadow-inner border rounded-lg p-8 w-full max-w-96">
				<h2 className="text-3xl font-bold text-center text-gray-400 mb-6">
					Create an Account
				</h2>
				<p className="px-3 my-5 text-xl font-bold text-gray-300">
					start your journey with us
				</p>
				{error ? (
					<p className="bg-rose-500 mb-3 p-3 rounded-xl text-white">{error}</p>
				) : null}
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-4">
					<div className="flex flex-col gap-4 mx-3">
						<label
							htmlFor="email"
							className="font-medium text-gray-400 text-lg">
							Email
						</label>
						<div className="flex items-center  py-2 px-3 rounded-lg bg-gray-900">
							<Mail></Mail>
							<input
								type="email"
								id="email"
								autoComplete="off"
								name="email"
								placeholder="Email"
								className="px-5 py-2 focus:outline-none"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
					<div className="flex flex-col gap-4 mx-3">
						<label
							htmlFor="userName"
							className="font-medium text-gray-400 text-lg">
							User Name
						</label>
						<div className="flex items-center py-2 px-3 rounded-lg bg-gray-900">
							<User></User>
							<input
								type="text"
								id="userName"
								autoComplete="off"
								name="userName"
								placeholder="User name"
								className="px-5 py-2 focus:outline-none"
								value={formData.userName}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
					<div className="flex flex-col gap-4 mx-3">
						<label
							htmlFor="password"
							className="font-medium text-gray-400 text-lg">
							Password
						</label>
						<div className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-900">
							<KeyRound></KeyRound>

							<input
								type={showPassword ? "text" : "password"}
								id="password"
								autoComplete="off"
								name="password"
								placeholder="Password"
								className=" focus:outline-none py-2 pl-5"
								value={formData.password}
								onChange={handleChange}
								required
							/>
							<Eye onClick={() => setShowPassword((p) => !p)}></Eye>
						</div>
					</div>

					<p className="px-3 font-medium">
						Already have an account ?
						<Link
							className="text-blue-500 mx-2 font-medium"
							to="/login">
							Sign in
						</Link>
					</p>

					<button
						type="submit"
						className="bg-green-500/70 py-2 my-4 rounded-lg  text-xl text-white">
						{isRegistering ? <Loader className="animate-spin"></Loader> : "Sign Up"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
