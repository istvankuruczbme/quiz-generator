import { FC, HTMLAttributes } from "react";
// Components
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";
import Modal from "../../../ui/modal/components/layout/Modal/Modal";
import AuthModal from "../../components/layout/AuthModal/AuthModal";
import Text from "../../../../components/ui/Text/Text";
import ProfileBackButton from "../../../user/components/ui/ProfileBackButton/ProfileBackButton";
import ChangePasswordForm from "../../components/form/ChangePasswordForm/ChangePasswordForm";
// CSS
import "./ChangePassword.css";

type ChangePasswordProps = HTMLAttributes<HTMLDivElement>;

const ChangePassword: FC<ChangePasswordProps> = () => {
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
					<ChangePasswordForm />
				</Modal.Body>
			</AuthModal>
		</AuthLayout>
	);
};

export default ChangePassword;
