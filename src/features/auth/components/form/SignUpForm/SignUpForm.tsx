import { FormEvent, useState } from "react";
import Checkbox from "../../../../../components/form/Checkbox/Checkbox";
import FormInputsContainer from "../../../../../components/form/FormInputsContainer/FormInputsContainer";
import Input from "../../../../../components/form/Input/Input";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
import useFormData from "../../../../../hooks/form/useFormData";
import { SIGN_UP_FORM_DATA } from "../../../constants/formData";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
import useError from "../../../../error/hooks/useError";
import validateSignUpInputs from "../../../utils/validation/validateSignUpInputs";
import signUpWithPassword from "../../../services/signUpWithPassword";

function SignUpForm() {
	// #region States
	const [data, updateData] = useFormData(SIGN_UP_FORM_DATA);
	const [loading, setLoading] = useState(false);
	//#endregion

	// #region Hooks
	const { setFeedback } = useFeedback();
	const { setError } = useError();
	// #endregion

	// #region Functions
	async function handleSignUpSubmit(e: FormEvent) {
		e.preventDefault();

		// Start loading
		setLoading(true);

		try {
			// Validation
			const { name, email, password } = validateSignUpInputs(data);

			// Sign up user
			await signUpWithPassword({ name, email, password });

			// Show feedback
			setFeedback({
				type: "success",
				message: "Sign up email sent.",
				details: "Check your inbox to verify your email.",
			});
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}
	//#endregion

	return (
		<form onSubmit={handleSignUpSubmit}>
			<FormInputsContainer>
				<Input
					type="text"
					label="Name"
					id="signUpName"
					placeholder="Name"
					required
					value={data.name}
					onChange={(e) => updateData({ name: e.target.value })}
				/>
				<Input
					type="email"
					label="Email"
					id="signUpEmail"
					placeholder="Email"
					required
					value={data.email}
					onChange={(e) => updateData({ email: e.target.value })}
				/>
				<Input
					type="password"
					label="Password"
					id="signUpPassword"
					placeholder="Password"
					required
					value={data.password}
					onChange={(e) => updateData({ password: e.target.value })}
				/>
				<Input
					type="password"
					label="Password Confirm"
					id="signUpPasswordConfirm"
					placeholder="Password Confirm"
					required
					value={data.passwordConfirm}
					onChange={(e) => updateData({ passwordConfirm: e.target.value })}
				/>

				<Checkbox
					label="I have read and accept the privacy notice"
					id="signUpPrivacy"
					required
					checked={data.policy}
					onChange={(e) => updateData({ policy: e.target.checked })}
				/>
			</FormInputsContainer>

			<LoadingButton type="submit" variant="accent" full loading={loading}>
				Sign Up
			</LoadingButton>
		</form>
	);
}

export default SignUpForm;
