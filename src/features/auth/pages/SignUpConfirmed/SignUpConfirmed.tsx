import { FC, HTMLAttributes } from "react";
// Components
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";
import AuthModal from "../../components/layout/AuthModal/AuthModal";
import Modal from "../../../ui/modal/components/layout/Modal/Modal";
import Text from "../../../../components/ui/Text/Text";
// CSS
import "./SignUpConfirmed.css";

type SignUpConfirmedProps = HTMLAttributes<HTMLDivElement>;

const SignUpConfirmed: FC<SignUpConfirmedProps> = () => {
	return (
		<AuthLayout>
			<AuthModal>
				<Modal.Header>
					<Modal.Title>Sign up verified</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Text mb="0">
						Email verified successfully. Now we are creating your profile. When it's finished
						you will be redirected.
					</Text>
				</Modal.Body>
			</AuthModal>
		</AuthLayout>
	);
};

export default SignUpConfirmed;
