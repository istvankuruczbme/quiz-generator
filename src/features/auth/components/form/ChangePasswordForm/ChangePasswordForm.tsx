import { FormEvent, useState } from "react";
import updateAuthPassword from "../../../services/updateAuthPassword";
import { useNavigate } from "react-router-dom";
import useError from "../../../../error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
import useFormData from "../../../../../hooks/form/useFormData";
import { CHANGE_PASSOWORD_FORM_DATA } from "../../../constants/formData";
import signOut from "../../../services/signOut";
import FormInputsContainer from "../../../../../components/form/FormInputsContainer/FormInputsContainer";
import Input from "../../../../../components/form/Input/Input";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
import validateChangePasswordInputs from "../../../utils/validation/validateChangePasswordInputs";

const ChangePasswordForm = () => {
	// #region States
	const [data, updateData] = useFormData(CHANGE_PASSOWORD_FORM_DATA);
	const [loading, setLoading] = useState(false);
	// #endregion

	// #region Hooks
	const navigate = useNavigate();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	//#endregion

	// #region Functions
	async function handleNewPasswordSubmit(e: FormEvent) {
		e.preventDefault();

		setLoading(true);

		try {
			// Validation
			const { password } = validateChangePasswordInputs(data);

			// Change password in Supabase
			await updateAuthPassword(password);

			// Show feedback
			setFeedback({
				type: "success",
				message: "Password updated.",
			});

			// Sign out user
			await signOut();

			// Navigate to sign in page
			navigate("/sign-in");
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}
	// #endregion

	return (
		<form onSubmit={handleNewPasswordSubmit}>
			<FormInputsContainer>
				<Input
					type="password"
					label="Password"
					placeholder="Password"
					id="changePassword"
					required
					value={data.password}
					onChange={(e) => updateData({ password: e.target.value })}
				/>
				<Input
					type="password"
					label="Password Confirm"
					placeholder="Password Confirm"
					id="changePasswordConfirm"
					required
					value={data.passwordConfirm}
					onChange={(e) => updateData({ passwordConfirm: e.target.value })}
				/>
			</FormInputsContainer>

			<LoadingButton type="submit" variant="accent" full loading={loading}>
				Change password
			</LoadingButton>
		</form>
	);
};

export default ChangePasswordForm;
