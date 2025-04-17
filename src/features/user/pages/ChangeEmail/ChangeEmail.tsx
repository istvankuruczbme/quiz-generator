import { FC, FormEvent, HTMLAttributes, useRef, useState } from "react";
// Components
import AuthLayout from "../../../auth/components/layout/AuthLayout/AuthLayout";
import Modal from "../../../ui/modal/components/layout/Modal/Modal";
import AuthModal from "../../../auth/components/layout/AuthModal/AuthModal";
import FormInputsContainer from "../../../../components/form/FormInputsContainer/FormInputsContainer";
import FormText from "../../../../components/form/FormText/FormText";
import Input from "../../../../components/form/Input/Input";
import LoadingButton from "../../../../components/ui/Button/LoadingButton/LoadingButton";
import ProfileBackButton from "../../components/ui/ProfileBackButton/ProfileBackButton";
// Hooks
import useError from "../../../ui/error/hooks/useError";
import useFeedback from "../../../ui/feedback/contexts/FeedbackContext/useFeedback";
// Functions
import validateEmail from "../../../../utils/validation/validateEmail";
import updateAuthEmail from "../../../auth/services/updateAuthEmail";
// CSS
import "./ChangeEmail.css";

type ChangeEmailProps = HTMLAttributes<HTMLDivElement>;

const ChangeEmail: FC<ChangeEmailProps> = () => {
	// #region States
	const [loading, setLoading] = useState(false);
	// #endregion

	// #region Hooks
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	// #endregion

	// #region Refs
	const emailRef = useRef<HTMLInputElement>(null);
	// #endregion

	// #region Functions
	async function handleNewEmailSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setLoading(true);

		// Input value
		const email = emailRef.current?.value;

		try {
			// Validate the email
			validateEmail(email);
		} catch (err) {
			setError(err);
			setLoading(false);
			return;
		}

		try {
			// Send confirmation email
			await updateAuthEmail(email as string);

			// Show feedback
			setFeedback({
				type: "success",
				message: "Email sent.",
				details: "Check your inbox to verify it.",
			});
		} catch (err) {
			console.log("Error sending confirmation email.", err);
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
					<Modal.Title>Change email</Modal.Title>
				</AuthModal.Header>

				<Modal.Body>
					<FormText>
						Type your new email address. After you hit submit a confirmation email will be
						sent to your inbox.
					</FormText>

					<form onSubmit={handleNewEmailSubmit}>
						<FormInputsContainer>
							<Input
								type="email"
								label="Email"
								id="changeEmail"
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

export default ChangeEmail;
