import { FC, FormEvent, HTMLAttributes, useRef } from "react";
// Hooks
import { Link, useNavigate } from "react-router-dom";
// Functions
import validateSignInInputs from "../../utils/validation/validateSignInInputs";
import signInWithPassword from "../../services/signInWithPassword";
import signInWithGoogle from "../../services/signInWithGoogle";
// CSS
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

		try {
			// Check input values
			validateSignInInputs(email, password);
		} catch (err) {
			console.log("Error signing up the user.\n", err);
			return;
		}

		try {
			// Sign in user
			await signInWithPassword(email as string, password as string);
		} catch (err) {
			console.log("Error signing in the user to Supabase.\n", err);
			return;
		}

		// Navigate
		navigate("/");
	}

	function handleGoogleSignInClick() {
		signInWithGoogle();
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

			<br />

			<Link to="/reset-password-email">
				<button type="button" tabIndex={-1}>
					Reset password
				</button>
			</Link>

			<br />
			<br />

			<button onClick={handleGoogleSignInClick}>Sign In with Google</button>
		</div>
	);
};

export default SignIn;
