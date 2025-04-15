import { FC, HTMLAttributes } from "react";
// Components
import Modal from "../../../modal/components/layout/Modal/Modal";
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";
import AuthModal from "../../components/layout/AuthModal/AuthModal";
import Text from "../../../../components/ui/Text/Text";
// CSS
import "./GoogleSignInConfirmed.css";

type GoogleSignInConfirmedProps = HTMLAttributes<HTMLDivElement>;

const GoogleSignInConfirmed: FC<GoogleSignInConfirmedProps> = () => {
	return (
		<AuthLayout>
			<AuthModal>
				<Modal.Header>
					<Modal.Title>Successful sign in</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Text mb="0">You will be redirected in a second.</Text>
				</Modal.Body>
			</AuthModal>
		</AuthLayout>
	);
};

export default GoogleSignInConfirmed;
