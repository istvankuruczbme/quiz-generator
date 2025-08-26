import { FC, HTMLAttributes } from "react";
// Components
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";
import Modal from "../../../ui/modal/components/layout/Modal/Modal";
import AuthModal from "../../components/layout/AuthModal/AuthModal";
import FormText from "../../../../components/form/FormText/FormText";
import ProfileBackButton from "../../../user/components/ui/ProfileBackButton/ProfileBackButton";
import ChangeEmailForm from "../../components/form/ChangeEmailForm/ChangeEmailForm";
// CSS
import "./ChangeEmail.css";

type ChangeEmailProps = HTMLAttributes<HTMLDivElement>;

const ChangeEmail: FC<ChangeEmailProps> = () => {
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

					<ChangeEmailForm />
				</Modal.Body>
			</AuthModal>
		</AuthLayout>
	);
};

export default ChangeEmail;
