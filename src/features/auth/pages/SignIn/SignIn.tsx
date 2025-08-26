import { FC, HTMLAttributes } from "react";
// Components
import Modal from "../../../ui/modal/components/layout/Modal/Modal";
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";
import AuthModal from "../../components/layout/AuthModal/AuthModal";
import Divider from "../../../../components/ui/Divider/Divider";
import AuthHeader from "../../components/layout/AuthHeader/AuthHeader";
import SignInForm from "../../components/form/SignInForm/SignInForm";
import GoogleSignInButton from "../../components/ui/GoogleSignInButton/GoogleSignInButton";
// CSS
import "./SignIn.css";

type SignInProps = HTMLAttributes<HTMLDivElement>;

const SignIn: FC<SignInProps> = () => {
	return (
		<AuthLayout>
			<AuthHeader />

			<AuthModal>
				<Modal.Header>
					<Modal.Title>Sign In</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<SignInForm />

					<Divider text="Or" my="2rem" />

					<GoogleSignInButton />
				</Modal.Body>
			</AuthModal>
		</AuthLayout>
	);
};

export default SignIn;
