import { FC, FormEvent, HTMLAttributes, useRef, useState } from "react";
// Components
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";
import Modal from "../../../../components/layout/Modal/Modal";
import Input from "../../../../components/form/Input/Input";
import FormInputsContainer from "../../../../components/form/FormInputsContainer/FormInputsContainer";
import AuthModal from "../../components/layout/AuthModal/AuthModal";
import LoadingButton from "../../../../components/ui/Button/LoadingButton/LoadingButton";
import Checkbox from "../../../../components/form/Checkbox/Checkbox";
import Divider from "../../../../components/ui/Divider/Divider";
import AuthHeader from "../../components/layout/AuthHeader/AuthHeader";
import GoogleSignInButton from "../../components/ui/GoogleSignInButton/GoogleSignInButton";
// Hooks
import useError from "../../../error/hooks/useError";
import useFeedback from "../../../feedback/contexts/FeedbackContext/useFeedback";
// Functions
import validateSignUpInputs from "../../utils/validation/validateSignUpInputs";
import signUpWithPassword from "../../services/signUpWithPassword";
import setNewUserFlag from "../../utils/setNewUserFlag";
// CSS
import "./SignUp.css";

type SignUpProps = HTMLAttributes<HTMLDivElement>;

const SignUp: FC<SignUpProps> = () => {
	// #region States
	const [loading, setLoading] = useState(false);
	//#endregion

	// #region Hooks
	const { setFeedback } = useFeedback();
	const { setError } = useError();
	// #endregion

	// #region Refs
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordConfirmRef = useRef<HTMLInputElement>(null);
	const privacyRef = useRef<HTMLInputElement>(null);
	// #endregion

	// #region Functions
	async function handleSignUpSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Start loading
		setLoading(true);

		// Input values
		const name = nameRef.current?.value;
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;
		const passwordConfirm = passwordConfirmRef.current?.value;
		const privacy = privacyRef.current?.checked;

		try {
			// Validation
			validateSignUpInputs(name, email, password, passwordConfirm, privacy);
		} catch (err) {
			setError(err);
			setLoading(false);
			return;
		}

		try {
			// Sign up user
			await signUpWithPassword(name as string, email as string, password as string);

			// Set newUser flag in localstorage
			setNewUserFlag();

			// Show feedback
			setFeedback({
				type: "success",
				message: "Sign up email sent.",
				details: "Check your inbox to verify your email.",
			});
		} catch (err) {
			console.log("Error signing up the user.\n", err);
		} finally {
			setLoading(false);
		}
	}
	//#endregion

	return (
		<AuthLayout>
			<AuthHeader />

			<AuthModal>
				<Modal.Header>
					<Modal.Title>Sign Up</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<form onSubmit={handleSignUpSubmit}>
						<FormInputsContainer>
							<Input
								type="text"
								label="Name"
								id="signUpName"
								placeholder="Name"
								required
								ref={nameRef}
							/>
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
							<Input
								type="password"
								label="Password Confirm"
								id="signUpPasswordConfirm"
								placeholder="Password Confirm"
								required
								ref={passwordConfirmRef}
							/>

							<Checkbox
								label="I have read and accept the privacy notice"
								id="signUpPrivacy"
								required
								ref={privacyRef}
							/>
						</FormInputsContainer>

						<LoadingButton type="submit" variant="accent" full loading={loading}>
							Sign Up
						</LoadingButton>
					</form>

					<Divider text="Or" my="2rem" />

					<GoogleSignInButton />
				</Modal.Body>
			</AuthModal>
		</AuthLayout>
	);
};

export default SignUp;
