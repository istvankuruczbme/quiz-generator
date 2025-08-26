import { useNavigate } from "react-router-dom";
import FormInputsContainer from "../../../../../components/form/FormInputsContainer/FormInputsContainer";
import Input from "../../../../../components/form/Input/Input";
import usePasswordReset from "../../../hooks/usePasswordReset";
import { FormEvent, useState } from "react";
import removePasswordResetFlag from "../../../utils/removePasswordResetFlag";
import useError from "../../../../error/hooks/useError";
import usePasswordResetData from "../../../hooks/usePasswordResetData";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
import validatePasswordResetInputs from "../../../utils/validation/validatePasswordResetInputs";
import updateAuthPassword from "../../../services/updateAuthPassword";
import useAuth from "../../../contexts/AuthContext/useAuth";

const PasswordResetForm = () => {
	// #region Loading
	const [loading, setLoading] = useState(false);
	//#endregion

	// #region Hooks
	usePasswordReset();
	const { setSession } = useAuth();
	const { session, loading: loadingData, data, updateData } = usePasswordResetData();
	const { setError } = useError();
	const navigate = useNavigate();
	// #endregion

	//#region Functions
	async function handlePasswordResetFormSubmit(e: FormEvent) {
		e.preventDefault();

		setLoading(true);

		// Check session
		if (!session) return;

		try {
			// Validation
			const { password } = validatePasswordResetInputs(data);

			// Update user password
			await updateAuthPassword(password);

			// Set session
			setSession(session);

			// Navigate back to sign in page
			navigate("/");

			// Remove flag
			removePasswordResetFlag();
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}
	// #endregion

	return (
		<form onSubmit={handlePasswordResetFormSubmit}>
			<FormInputsContainer>
				<Input
					type="email"
					label="Email"
					id="PasswordResetEmail"
					placeholder="Email"
					required
					disabled
					value={data.email}
				/>
				<Input
					type="password"
					label="Password"
					id="PasswordResetPassword"
					placeholder="Password"
					required
					value={data.password}
					onChange={(e) => updateData({ password: e.target.value })}
				/>
				<Input
					type="password"
					label="Password Confirm"
					id="PasswordResetPasswordConfirm"
					placeholder="Password Confirm"
					required
					value={data.passwordConfirm}
					onChange={(e) => updateData({ passwordConfirm: e.target.value })}
				/>
			</FormInputsContainer>

			<LoadingButton type="submit" variant="accent" full loading={loading}>
				Reset password
			</LoadingButton>
		</form>
	);
};

export default PasswordResetForm;
