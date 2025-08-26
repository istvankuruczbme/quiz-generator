import { FC, HTMLAttributes } from "react";
// Components
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";
import Modal from "../../../ui/modal/components/layout/Modal/Modal";
import AuthModal from "../../components/layout/AuthModal/AuthModal";
import Divider from "../../../../components/ui/Divider/Divider";
import AuthHeader from "../../components/layout/AuthHeader/AuthHeader";
import SignUpForm from "../../components/form/SignUpForm/SignUpForm";
import GoogleSignInButton from "../../components/ui/GoogleSignInButton/GoogleSignInButton";
// CSS
import "./SignUp.css";

type SignUpProps = HTMLAttributes<HTMLDivElement>;

const SignUp: FC<SignUpProps> = () => {
	return (
		<AuthLayout>
			<AuthHeader />

			<AuthModal>
				<Modal.Header>
					<Modal.Title>Sign Up</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<SignUpForm />

					<Divider text="Or" my="2rem" />

					<GoogleSignInButton />
				</Modal.Body>
			</AuthModal>
		</AuthLayout>
	);
};

export default SignUp;
