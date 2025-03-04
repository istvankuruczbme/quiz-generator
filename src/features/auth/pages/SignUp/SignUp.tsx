import { FC, FormEvent, HTMLAttributes, useRef } from "react";
// Hooks
import { useNavigate } from "react-router-dom";
// Functions
import validateSignUpInputs from "../../utils/validation/validateSignUpInputs";
import signUpWithPassword from "../../services/signUpWithPassword";
import signInWithGoogle from "../../services/signInWithGoogle";
// CSS
import "./SignUp.css";

type SignUpProps = HTMLAttributes<HTMLDivElement>;

const SignUp: FC<SignUpProps> = () => {
	// #region Hooks
	const navigate = useNavigate();
	// #endregion

	// #region Refs
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordConfirmRef = useRef<HTMLInputElement>(null);
	// #endregion

	// #region Functions
	async function handleSignUpSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Input values
		const name = nameRef.current?.value;
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;
		const passwordConfirm = passwordConfirmRef.current?.value;

		try {
			// Check input values
			validateSignUpInputs(name, email, password, passwordConfirm);
		} catch (err) {
			console.log("Error validating sign up data.\n", err);
			return;
		}

		try {
			// Sign up user
			await signUpWithPassword(name as string, email as string, password as string);

			// Navigate
			navigate("/profile/subscription");
		} catch (err) {
			console.log("Error signing up the user.\n", err);
		}
	}

	function handleGoogleSignUpClick() {
		signInWithGoogle();
	}
	//#endregion

	return (
		<div>
			<h1>Sign Up</h1>

			<form onSubmit={handleSignUpSubmit}>
				<label htmlFor="signUpName">Name:</label>
				<input type="text" id="signUpName" placeholder="Name" required ref={nameRef} />
				<br />

				<label htmlFor="signUpEmail">Email:</label>
				<input type="email" id="signUpEmail" placeholder="Email" required ref={emailRef} />
				<br />

				<label htmlFor="signUpPassword">Password:</label>
				<input
					type="password"
					id="signUpPassword"
					placeholder="Password"
					required
					ref={passwordRef}
				/>
				<br />

				<label htmlFor="signUpPasswordConfirm">Password Confirm:</label>
				<input
					type="password"
					id="signUpPasswordConfirm"
					placeholder="Password Confirm"
					required
					ref={passwordConfirmRef}
				/>
				<br />

				<button type="submit">Create account</button>
			</form>

			<br />

			<button onClick={handleGoogleSignUpClick}>Sign Up with Google</button>
		</div>
	);
};

export default SignUp;
