import { FC, FormEvent, HTMLAttributes, useRef } from "react";
import { useNavigate } from "react-router-dom";
import signInWithPassword from "../../services/signInWithPassword";
import "./SignIn.css";

type SignInProps = HTMLAttributes<HTMLDivElement>;

const SignIn: FC<SignInProps> = () => {
	// #region Hooks
	const navigate = useNavigate();
	//#endregion

	// #region Refs
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	// #endregion

	// #region Functions
	async function handleSignInClick(e: FormEvent<HTMLFormElement>) {
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
			await signInWithPassword(email as string, password as string);

			// Navigate
			navigate("/");
		} catch (err) {
			console.log("Error signing in the user to Supabase.\n", err);
		}
	}
	//#endregion

	return (
		<div>
			<h1>SignIn</h1>

			<form onSubmit={handleSignInClick}>
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
