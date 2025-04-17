import { FC, FormEvent, HTMLAttributes, useRef, useState } from "react";
// Components
import AuthLayout from "../../../auth/components/layout/AuthLayout/AuthLayout";
import Modal from "../../../ui/modal/components/layout/Modal/Modal";
import AuthModal from "../../../auth/components/layout/AuthModal/AuthModal";
import Input from "../../../../components/form/Input/Input";
import Text from "../../../../components/ui/Text/Text";
import FormInputsContainer from "../../../../components/form/FormInputsContainer/FormInputsContainer";
import LoadingButton from "../../../../components/ui/Button/LoadingButton/LoadingButton";
import ProfileBackButton from "../../components/ui/ProfileBackButton/ProfileBackButton";
// Hooks
import useError from "../../../ui/error/hooks/useError";
import useFeedback from "../../../ui/feedback/contexts/FeedbackContext/useFeedback";
import { useNavigate } from "react-router-dom";
// Functions
import validateChangePasswordInputs from "../../utils/validation/validateChangePasswordInputs";
import updateUserPassword from "../../../auth/services/updateAuthPassword";
import signOut from "../../../auth/services/signOut";
// CSS
import "./ChangePassword.css";

type ChangePasswordProps = HTMLAttributes<HTMLDivElement>;

const ChangePassword: FC<ChangePasswordProps> = () => {
	// #region States
	const [loading, setLoading] = useState(false);
	// #endregion

	// #region Hooks
	const navigate = useNavigate();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	//#endregion

	// #region Refs
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordConfirmRef = useRef<HTMLInputElement>(null);
	//#endregion

	// #region Functions
	async function handleNewPasswordSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setLoading(true);

		// Input values
		const password = passwordRef.current?.value;
		const passwordConfirm = passwordConfirmRef.current?.value;

		try {
			// Validation
			validateChangePasswordInputs(password, passwordConfirm);
		} catch (err) {
			setError(err);
			setLoading(false);
			return;
		}

		try {
			// Change password in Supabase
			await updateUserPassword(password as string);

			// Show feedback
			setFeedback({
				type: "success",
				message: "Password updated.",
			});

			// Sign out user
			await signOut();

			// Navigate to sign in page
			navigate("/sign-in");
		} catch (err) {
			// console.log("Error updating user password.", err);
			setError(err);
		} finally {
			setLoading(false);
		}
	}
	// #endregion

	return (
		<AuthLayout>
			<AuthModal>
				<AuthModal.Header>
					<ProfileBackButton variant="secondary" />
					<Modal.Title>Change password</Modal.Title>
				</AuthModal.Header>

				<Modal.Body>
					<Text variant="neutral-400">
						After you password was updated you have to sign in with it.
					</Text>

					<form onSubmit={handleNewPasswordSubmit}>
						<FormInputsContainer>
							<Input
								type="password"
								label="Password"
								placeholder="Password"
								id="changePassword"
								required
								ref={passwordRef}
							/>
							<Input
								type="password"
								label="Password Confirm"
								placeholder="Password Confirm"
								id="changePasswordConfirm"
								required
								ref={passwordConfirmRef}
							/>
						</FormInputsContainer>

						<LoadingButton type="submit" variant="accent" full loading={loading}>
							Change password
						</LoadingButton>
					</form>
				</Modal.Body>
			</AuthModal>
		</AuthLayout>
	);
};

export default ChangePassword;
