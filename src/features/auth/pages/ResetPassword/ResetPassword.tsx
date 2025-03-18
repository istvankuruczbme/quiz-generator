import { FC, FormEvent, HTMLAttributes, useRef } from "react";
import useResetPasswordEmail from "../../hooks/useResetPasswordEmail";
import { useNavigate } from "react-router-dom";
import validateResetPasswordInputs from "../../utils/validation/validateResetPasswordInputs";
import updateUserPassword from "../../services/updateAuthPassword";
import "./ResetPassword.css";

type ResetPasswordProps = HTMLAttributes<HTMLDivElement>;

const ResetPassword: FC<ResetPasswordProps> = () => {
	// #region Refs
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordConfirmRef = useRef<HTMLInputElement>(null);
	// #endregion

	// #region Hooks
	const { email } = useResetPasswordEmail();
	const navigate = useNavigate();
	// #endregion

	//#region Functions
	async function handlePasswordResetFormSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Input values
		const password = passwordRef.current?.value;
		const passwordConfirm = passwordConfirmRef.current?.value;

		try {
			// Validation
			validateResetPasswordInputs(email, password, passwordConfirm);
		} catch (err) {
			console.log(err);
			return;
		}

		try {
			// Update user password
			await updateUserPassword(password as string);
		} catch (err) {
			console.log("Error updating the email of user.", err);
			return;
		}

		navigate("/sign-in");
	}
	// #endregion

	return (
		<div>
			<h1>Reset password</h1>

			<form onSubmit={handlePasswordResetFormSubmit}>
				<label htmlFor="resetPasswordEmail">Email:</label>
				<input
					type="email"
					id="resetPasswordEmail"
					placeholder="Email"
					required
					disabled
					value={email}
				/>
				<br />
				<label htmlFor="resetPasswordPassword">Password:</label>
				<input
					type="password"
					id="resetPasswordPassword"
					placeholder="Password"
					required
					ref={passwordRef}
				/>
				<br />
				<label htmlFor="resetPasswordPasswordConfirm">Password Confirm:</label>
				<input
					type="password"
					id="resetPasswordPasswordConfirm"
					placeholder="Password Confirm"
					required
					ref={passwordConfirmRef}
				/>
				<br />

				<button type="submit">Reset password</button>
			</form>
		</div>
	);
};

export default ResetPassword;
