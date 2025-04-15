import { FC, FormEvent, HTMLAttributes, useRef, useState } from "react";
// Components
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";
import Modal from "../../../modal/components/layout/Modal/Modal";
import AuthModal from "../../components/layout/AuthModal/AuthModal";
import FormInputsContainer from "../../../../components/form/FormInputsContainer/FormInputsContainer";
import Input from "../../../../components/form/Input/Input";
import LoadingButton from "../../../../components/ui/Button/LoadingButton/LoadingButton";
import AuthHeader from "../../components/layout/AuthHeader/AuthHeader";
import FormText from "../../../../components/form/FormText/FormText";
// Hooks
import useAuthUser from "../../hooks/useAuthUser";
import usePasswordReset from "../../hooks/usePasswordReset";
import { useNavigate } from "react-router-dom";
// Functions
import validateResetPasswordInputs from "../../utils/validation/validateResetPasswordInputs";
import updateUserPassword from "../../services/updateAuthPassword";
import removePasswordResetFlag from "../../utils/removePasswordResetFlag";
// CSS
import "./ResetPassword.css";

type ResetPasswordProps = HTMLAttributes<HTMLDivElement>;

const ResetPassword: FC<ResetPasswordProps> = () => {
	// #region Loading
	const [loading, setLoading] = useState(false);
	//#endregion

	// #region Refs
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordConfirmRef = useRef<HTMLInputElement>(null);
	// #endregion

	// #region Hooks
	usePasswordReset();
	const { user } = useAuthUser();
	const navigate = useNavigate();
	// #endregion

	//#region Functions
	async function handlePasswordResetFormSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setLoading(true);

		// Check user
		if (user == null) return;

		// Input values
		const password = passwordRef.current?.value;
		const passwordConfirm = passwordConfirmRef.current?.value;

		try {
			// Validation
			validateResetPasswordInputs(password, passwordConfirm);
		} catch (err) {
			console.log(err);
			setLoading(false);
			return;
		}

		try {
			// Update user password
			await updateUserPassword(password as string);

			// Remove flag
			removePasswordResetFlag();
		} catch (err) {
			console.log("Error updating the email of user.", err);
			setLoading(false);
			return;
		}

		// Navigate back to sign in page
		navigate("/sign-in");
		setLoading(false);
	}
	// #endregion

	// if (user == null) return null;
	return (
		<AuthLayout>
			<AuthHeader />

			<AuthModal>
				<Modal.Header>
					<Modal.Title>Reset password</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<FormText>Enter your new password and sign in with it after.</FormText>

					<form onSubmit={handlePasswordResetFormSubmit}>
						<FormInputsContainer>
							<Input
								type="email"
								label="Email"
								id="resetPasswordEmail"
								placeholder="Email"
								required
								disabled
								value={user?.email || ""}
							/>
							<Input
								type="password"
								label="Password"
								id="resetPasswordPassword"
								placeholder="Password"
								required
								ref={passwordRef}
							/>
							<Input
								type="password"
								label="Password Confirm"
								id="resetPasswordPasswordConfirm"
								placeholder="Password Confirm"
								required
								ref={passwordConfirmRef}
							/>
						</FormInputsContainer>

						<LoadingButton type="submit" variant="accent" full loading={loading}>
							Reset password
						</LoadingButton>
					</form>
				</Modal.Body>
			</AuthModal>
		</AuthLayout>
	);
};

export default ResetPassword;
