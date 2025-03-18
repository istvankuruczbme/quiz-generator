import { FC, FormEvent, HTMLAttributes, useRef } from "react";
import validateEmail from "../../../../utils/validation/validateEmail";
import { supabase } from "../../../../config/supabase";
import "./SendResetPasswordEmail.css";

type SendResetPasswordEmailProps = HTMLAttributes<HTMLDivElement>;

const SendResetPasswordEmail: FC<SendResetPasswordEmailProps> = () => {
	// #region Refs
	const emailRef = useRef<HTMLInputElement>(null);
	// #endregion

	// #region Functions
	async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Input value
		const email = emailRef.current?.value;

		try {
			// Validation
			validateEmail(email, "auth/");
		} catch (err) {
			console.log(err);
			return;
		}

		try {
			// Send password reset email
			const { error } = await supabase.auth.resetPasswordForEmail(email as string, {
				redirectTo: `${import.meta.env.VITE_CLIENT_URL}/reset-password?email=${email}`,
			});

			// Check error
			if (error != null) throw error;

			console.log("Email sent.");
		} catch (err) {
			console.log("Error sending the password reset email.", err);
			return;
		}
	}
	// #endregion

	return (
		<div>
			<h1>Reset Password</h1>

			<p>Type your email to receive further information on reseting your password.</p>

			<form onSubmit={handleFormSubmit}>
				<label htmlFor="resetPasswordEmail">Email:</label>
				<input
					type="email"
					id="resetPasswordEmail"
					placeholder="Email"
					required
					ref={emailRef}
				/>
				<br />

				<button type="submit">Send email</button>
			</form>
		</div>
	);
};

export default SendResetPasswordEmail;
