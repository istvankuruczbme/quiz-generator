import { FormEvent, useState } from "react";
import useFormData from "../../../../../hooks/form/useFormData";
import { SIGN_IN_FORM_DATA } from "../../../constants/formData";
import useError from "../../../../error/hooks/useError";
import { Link, useNavigate } from "react-router-dom";
import validateSignInInputs from "../../../utils/validation/validateSignInInputs";
import signInWithPassword from "../../../services/signInWithPassword";
import FormInputsContainer from "../../../../../components/form/FormInputsContainer/FormInputsContainer";
import Input from "../../../../../components/form/Input/Input";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";

function SignInForm() {
	// #region Loading
	const [data, updateData] = useFormData(SIGN_IN_FORM_DATA);
	const [loading, setLoading] = useState(false);
	//#endregion

	// #region Hooks
	const { setError } = useError();
	const navigate = useNavigate();
	//#endregion

	// #region Functions
	async function handleSignInClick(e: FormEvent) {
		e.preventDefault();

		setLoading(true);

		try {
			// Validation
			const { email, password } = validateSignInInputs(data);

			// Sign in user
			await signInWithPassword({ email, password });

			// Navigate
			navigate("/");
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}
	//#endregion

	return (
		<form onSubmit={handleSignInClick}>
			<FormInputsContainer>
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
				<Link to="/reset-password-email" className="signin__password__reset">
					Forgot your password?
				</Link>
			</FormInputsContainer>

			<LoadingButton type="submit" variant="accent" full loading={loading}>
				Sign In
			</LoadingButton>
		</form>
	);
}

export default SignInForm;
