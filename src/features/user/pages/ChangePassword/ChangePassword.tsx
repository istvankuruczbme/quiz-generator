import { FC, FormEvent, HTMLAttributes, useRef } from "react";
// Functions
import validateChangePasswordInputs from "../../utils/validation/validateChangePasswordInputs";
import updateUserPassword from "../../services/updateUserPassword";
// CSS
import "./ChangePassword.css";
import { useNavigate } from "react-router-dom";

type ChangePasswordProps = HTMLAttributes<HTMLDivElement>;

const ChangePassword: FC<ChangePasswordProps> = () => {
	// #region Hooks
	const navigate = useNavigate();
	//#endregion

	// #region Refs
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordConfirmRef = useRef<HTMLInputElement>(null);
	//#endregion

	// #region Functions
	async function handleNewPasswordSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Input values
		const password = passwordRef.current?.value;
		const passwordConfirm = passwordConfirmRef.current?.value;

		try {
			// Validation
			validateChangePasswordInputs(password, passwordConfirm);
		} catch (err) {
			console.log("Error during valdiation of input values.", err);
			return;
		}

		try {
			// Change password in Supabase
			await updateUserPassword(password as string);
		} catch (err) {
			console.log("Error updating user password.", err);
			return;
		}

		navigate("/profile");
	}
	// #endregion

	return (
		<div>
			<h1>Change password</h1>

			<form onSubmit={handleNewPasswordSubmit}>
				<label htmlFor="changePassword">Password:</label>
				<input
					type="password"
					id="changePassword"
					placeholder="Password"
					required
					ref={passwordRef}
				/>
				<br />

				<label htmlFor="changePasswordConfirm">Password Confirm:</label>
				<input
					type="password"
					id="changePasswordConfirm"
					placeholder="Password Confirm"
					required
					ref={passwordConfirmRef}
				/>
				<br />

				<button type="submit">Change password</button>
			</form>
		</div>
	);
};

export default ChangePassword;
