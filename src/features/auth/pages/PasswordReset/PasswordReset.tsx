import { FC, HTMLAttributes } from "react";
// Components
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";
import Modal from "../../../ui/modal/components/layout/Modal/Modal";
import AuthModal from "../../components/layout/AuthModal/AuthModal";
import AuthHeader from "../../components/layout/AuthHeader/AuthHeader";
import FormText from "../../../../components/form/FormText/FormText";
import PasswordResetForm from "../../components/form/PasswordResetForm/PasswordResetForm";
// CSS
import "./PasswordReset.css";

type PasswordResetProps = HTMLAttributes<HTMLDivElement>;

const PasswordReset: FC<PasswordResetProps> = () => {
	return (
		<AuthLayout>
			<AuthHeader />

			<AuthModal>
				<Modal.Header>
					<Modal.Title>Reset password</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<FormText>Enter your new password and sign in with it after.</FormText>
					<PasswordResetForm />
				</Modal.Body>
			</AuthModal>
		</AuthLayout>
	);
};

export default PasswordReset;
