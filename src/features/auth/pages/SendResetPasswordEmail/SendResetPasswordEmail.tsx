import { FC, FormEvent, HTMLAttributes, useRef, useState } from "react";
// Components
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";
import Modal from "../../../ui/modal/components/layout/Modal/Modal";
import AuthHeader from "../../components/layout/AuthHeader/AuthHeader";
import Input from "../../../../components/form/Input/Input";
import LoadingButton from "../../../../components/ui/Button/LoadingButton/LoadingButton";
import AuthModal from "../../components/layout/AuthModal/AuthModal";
import FormInputsContainer from "../../../../components/form/FormInputsContainer/FormInputsContainer";
import FormText from "../../../../components/form/FormText/FormText";
import BackButton from "../../../../components/ui/Button/BackButton/BackButton";
// Hooks
import useError from "../../../ui/error/hooks/useError";
import useFeedback from "../../../ui/feedback/contexts/FeedbackContext/useFeedback";
// Functions
import validateEmail from "../../../../utils/validation/validateEmail";
import sendPasswordResetEmail from "../../services/sendPasswordResetEmail";
import setPasswordResetFlag from "../../utils/setPasswordResetFlag";
// CSS
import "./SendResetPasswordEmail.css";

type SendResetPasswordEmailProps = HTMLAttributes<HTMLDivElement>;

const SendResetPasswordEmail: FC<SendResetPasswordEmailProps> = () => {
	// #region Loading
	const [loading, setLoading] = useState(false);
	//#endregion

	// #region Hooks
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	// #endregion

	// #region Refs
	const emailRef = useRef<HTMLInputElement>(null);
	// #endregion

	// #region Functions
	async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setLoading(true);

		// Input value
		const email = emailRef.current?.value;

		try {
			// Validation
			validateEmail(email, "auth/");
		} catch (err) {
			setError(err);
			setLoading(false);
			return;
		}

		try {
			// Send password reset email
			await sendPasswordResetEmail(email as string);

			// Set password reset flag
			setPasswordResetFlag();

			// Show feedback
			setFeedback({
				type: "success",
				message: "Email sent.",
				details: "Check your inbox.",
			});
		} catch (err) {
			// console.log("Error sending the password reset email.", err);
			setError(err);
		} finally {
			setLoading(false);
		}
	}
	// #endregion

	return (
		<AuthLayout>
			<AuthHeader />

			<AuthModal>
				<AuthModal.Header>
					<BackButton to="/sign-in" variant="secondary">
						Sign In
					</BackButton>
					<Modal.Title>Send password reset email</Modal.Title>
				</AuthModal.Header>

				<Modal.Body>
					<FormText>
						Type your email to receive further information on reseting your password.
					</FormText>

					<form onSubmit={handleFormSubmit}>
						<FormInputsContainer>
							<Input
								type="email"
								label="Email"
								id="resetPasswordEmail"
								placeholder="Email"
								required
								ref={emailRef}
							/>
						</FormInputsContainer>

						<LoadingButton type="submit" variant="accent" full loading={loading}>
							Send email
						</LoadingButton>
					</form>
				</Modal.Body>
			</AuthModal>
		</AuthLayout>
	);
};

export default SendResetPasswordEmail;
