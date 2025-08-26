import { FormEvent, useState } from "react";
import useFormData from "../../../../../hooks/form/useFormData";
import { CHANGE_EMAIL_FORM_DATA } from "../../../constants/formData";
import useError from "../../../../error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
import validateChangeEmailInputs from "../../../utils/validation/validateChangeEmailInputs";
import updateAuthEmail from "../../../services/updateAuthEmail";
import FormInputsContainer from "../../../../../components/form/FormInputsContainer/FormInputsContainer";
import Input from "../../../../../components/form/Input/Input";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";

const ChangeEmailForm = () => {
	// #region States
	const [data, updateData] = useFormData(CHANGE_EMAIL_FORM_DATA);
	const [loading, setLoading] = useState(false);
	// #endregion

	// #region Hooks
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	// #endregion

	// #region Functions
	async function handleNewEmailSubmit(e: FormEvent) {
		e.preventDefault();

		setLoading(true);

		try {
			// Validation
			const { email } = validateChangeEmailInputs(data);

			// Send confirmation email
			await updateAuthEmail(email);

			// Show feedback
			setFeedback({
				type: "success",
				message: "Email sent.",
				details: "Check your inbox to verify it.",
			});
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}
	// #endregion

	return (
		<form onSubmit={handleNewEmailSubmit}>
			<FormInputsContainer>
				<Input
					type="email"
					label="Email"
					id="changeEmail"
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

export default ChangeEmailForm;
