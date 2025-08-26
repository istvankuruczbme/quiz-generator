import { FormEvent, useState } from "react";
import FormInputsContainer from "../../../../../components/form/FormInputsContainer/FormInputsContainer";
import Input from "../../../../../components/form/Input/Input";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
import useFormData from "../../../../../hooks/form/useFormData";
import { PASSWORD_RESET_EMAIL_FORM_DATA } from "../../../constants/formData";
import useError from "../../../../error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
import sendPasswordResetEmail from "../../../services/sendPasswordResetEmail";
import setPasswordResetFlag from "../../../utils/setPasswordResetFlag";
import validatePasswordResetEmailInputs from "../../../utils/validation/validatePasswordResetEmailInputs";

const PasswordResetEmailForm = () => {
	// #region Loading
	const [data, updateData] = useFormData(PASSWORD_RESET_EMAIL_FORM_DATA);
	const [loading, setLoading] = useState(false);
	//#endregion

	// #region Hooks
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	// #endregion

	// #region Functions
	async function handleFormSubmit(e: FormEvent) {
		e.preventDefault();

		setLoading(true);

		try {
			// Validation
			const { email } = validatePasswordResetEmailInputs(data);

			// Send password reset email
			await sendPasswordResetEmail(email);

			// Set password reset flag
			setPasswordResetFlag();

			// Show feedback
			setFeedback({
				type: "success",
				message: "Email sent.",
				details: "Check your inbox.",
			});
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}
	// #endregion

	return (
		<form onSubmit={handleFormSubmit}>
			<FormInputsContainer>
				<Input
					type="email"
					label="Email"
					id="resetPasswordEmail"
					placeholder="Email"
					required
					value={data.email}
					onChange={(e) => updateData({ email: e.target.value })}
				/>
			</FormInputsContainer>

			<LoadingButton type="submit" variant="accent" full loading={loading}>
				Send email
			</LoadingButton>
		</form>
	);
};

export default PasswordResetEmailForm;
