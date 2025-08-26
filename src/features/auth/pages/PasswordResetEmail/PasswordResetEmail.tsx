import { FC, HTMLAttributes } from "react";
// Components
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";
import Modal from "../../../ui/modal/components/layout/Modal/Modal";
import AuthHeader from "../../components/layout/AuthHeader/AuthHeader";
import AuthModal from "../../components/layout/AuthModal/AuthModal";
import FormText from "../../../../components/form/FormText/FormText";
import BackButton from "../../../../components/ui/Button/BackButton/BackButton";
import PasswordResetEmailForm from "../../components/form/PasswordResetEmailForm/PasswordResetEmailForm";
// CSS
import "./PasswordResetEmail.css";

type PasswordResetEmailProps = HTMLAttributes<HTMLDivElement>;

const PasswordResetEmail: FC<PasswordResetEmailProps> = () => {
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

					<PasswordResetEmailForm />
				</Modal.Body>
			</AuthModal>
		</AuthLayout>
	);
};

export default PasswordResetEmail;
