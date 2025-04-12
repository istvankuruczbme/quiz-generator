import { FC, FormEvent, HTMLAttributes, useRef, useState } from "react";
// Components
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";
import AuthModal from "../../components/layout/AuthModal/AuthModal";
import Modal from "../../../../components/layout/Modal/Modal";
import FormInputsContainer from "../../../../components/form/FormInputsContainer/FormInputsContainer";
import Input from "../../../../components/form/Input/Input";
import LoadingButton from "../../../../components/ui/Button/LoadingButton/LoadingButton";
import Divider from "../../../../components/ui/Divider/Divider";
import AuthHeader from "../../components/layout/AuthHeader/AuthHeader";
import GoogleSignInButton from "../../components/ui/GoogleSignInButton/GoogleSignInButton";
import LinkButton from "../../../../components/ui/Button/LinkButton/LinkButton";
// Hooks
import { useNavigate } from "react-router-dom";
import useError from "../../../error/hooks/useError";
// Functions
import validateSignInInputs from "../../utils/validation/validateSignInInputs";
import signInWithPassword from "../../services/signInWithPassword";
// CSS
import "./SignIn.css";

type SignInProps = HTMLAttributes<HTMLDivElement>;

const SignIn: FC<SignInProps> = () => {
	// #region Loading
	const [loading, setLoading] = useState(false);
	//#endregion

	// #region Hooks
	const { setError } = useError();
	const navigate = useNavigate();
	//#endregion

	// #region Refs
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	// #endregion

	// #region Functions
	async function handleSignInClick(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setLoading(true);

		// Input values
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;

		try {
			// Check input values
			validateSignInInputs(email, password);
		} catch (err) {
			setError(err);
			setLoading(false);
			return;
		}

		try {
			// Sign in user
			await signInWithPassword(email as string, password as string);
		} catch (err) {
			// console.log("Error signing in the user to Supabase.\n", err);
			setError(err);
			setLoading(false);
			return;
		}

		// Navigate
		navigate("/");
		setLoading(false);
	}
	//#endregion

	return (
		<AuthLayout>
			<AuthHeader />

			<AuthModal>
				<Modal.Header>
					<Modal.Title>Sign In</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<form onSubmit={handleSignInClick}>
						<FormInputsContainer>
							<Input
								type="email"
								label="Email"
								id="signUpEmail"
								placeholder="Email"
								required
								ref={emailRef}
							/>
							<Input
								type="password"
								label="Password"
								id="signUpPassword"
								placeholder="Password"
								required
								ref={passwordRef}
							/>
						</FormInputsContainer>

						<LoadingButton type="submit" variant="accent" full loading={loading}>
							Sign In
						</LoadingButton>
					</form>

					<Divider text="Forgot your password?" my="2rem" />

					<LinkButton to="/reset-password-email" variant="primary" full>
						New password
					</LinkButton>

					<Divider text="Or" my="2rem" />

					<GoogleSignInButton />
				</Modal.Body>
			</AuthModal>
		</AuthLayout>
	);
};

export default SignIn;
