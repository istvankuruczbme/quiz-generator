import { FC, FormEvent, HTMLAttributes, useRef } from "react";
import "./SignIn.css";
import { supabase } from "../../../lib/supabase";

type SignInProps = HTMLAttributes<HTMLDivElement>;

const SignIn: FC<SignInProps> = () => {
	// #region Refs
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	// #endregion

	// #region Functions
	async function signInUser(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Input values
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;

		// Check input values
		try {
			if (email == undefined || email === "") throw new Error("auth/invalid-email");
			if (password == undefined) throw new Error("auth/password-missing");
			if (password.length < 6) throw new Error("auth/password-too-short");
		} catch (err) {
			console.log("Error signing up the user.\n", err);
			return;
		}

		// Sign in user
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: email as string,
				password: password as string,
			});

			// Check if there is an error
			if (error != null) {
				console.log(error.code);
				throw error;
			}

			// Log data
			console.log("Sign in data: ", data);
		} catch (err) {
			console.log("Error signing in the user to Supabase.\n", err);
		}
	}
	//#endregion

	return (
		<div>
			<h1>SignIn</h1>
			<form onSubmit={signInUser}>
				<label htmlFor="sinInEmail">Email:</label>
				<input type="email" id="sinInEmail" placeholder="Email" required ref={emailRef} />
				<br />

				<label htmlFor="signInPassword">Password:</label>
				<input
					type="password"
					id="signInPassword"
					placeholder="Password"
					required
					ref={passwordRef}
				/>
				<br />

				<button type="submit">Sign In</button>
			</form>
		</div>
	);
};

export default SignIn;
