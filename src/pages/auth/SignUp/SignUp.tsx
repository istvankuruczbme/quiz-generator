import { FC, FormEvent, HTMLAttributes, useState } from "react";
import "./SignUp.css";
import { supabase } from "../../../lib/supabase";

type SignUpProps = HTMLAttributes<HTMLDivElement>;

const SignUp: FC<SignUpProps> = () => {
	// #region States
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	// #endregion

	// #region Functions
	async function signUpUser(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Check input values
		try {
			if (email == undefined || email === "") throw new Error("auth/invalid-email");
			if (password == undefined) throw new Error("auth/password-missing");
			if (password.length < 6) throw new Error("auth/password-too-short");
			if (password !== passwordConfirm) throw new Error("auth/passwords-dont-match");
		} catch (err) {
			console.log("Error signing up the user.\n", err);
			return;
		}

		// Sign up user
		try {
			const { data, error } = await supabase.auth.signUp({
				email: email as string,
				password: password as string,
			});

			// Check if there was an error
			if (error != null) {
				console.log(error.code);
				throw error;
			}

			// Log data
			console.log("Data from auth: ", data);
		} catch (err) {
			console.log("Error adding the user to Supabase.\n", err);
		}
	}
	//#endregion

	return (
		<div>
			<h1>Sign Up</h1>

			<form onSubmit={signUpUser}>
				<label htmlFor="signUpName">Name:</label>
				<input
					type="text"
					id="signUpName"
					placeholder="Name"
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<br />

				<label htmlFor="signUpEmail">Email:</label>
				<input
					type="email"
					id="signUpEmail"
					placeholder="Email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<br />

				<label htmlFor="signUpPassword">Password:</label>
				<input
					type="password"
					id="signUpPassword"
					placeholder="Password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />

				<label htmlFor="signUpPasswordConfirm">Password Confirm:</label>
				<input
					type="password"
					id="signUpPasswordConfirm"
					placeholder="Password Confirm"
					required
					value={passwordConfirm}
					onChange={(e) => setPasswordConfirm(e.target.value)}
				/>
				<br />

				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
};

export default SignUp;
