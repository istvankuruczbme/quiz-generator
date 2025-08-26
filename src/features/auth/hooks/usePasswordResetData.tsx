import { useEffect } from "react";
import useFormData from "../../../hooks/form/useFormData";
import { PASSWORD_RESET_FORM_DATA } from "../constants/formData";
import useAuthSession from "./useAuthSession";

function usePasswordResetData() {
	// #region States
	const [data, updateData] = useFormData(PASSWORD_RESET_FORM_DATA);
	// #endregion

	// #region Hooks
	const { session, loading } = useAuthSession();
	// #endregion

	useEffect(() => {
		// No session
		if (!session) {
			updateData(PASSWORD_RESET_FORM_DATA);
			return;
		}

		// Update email
		updateData({ email: session.user.email });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session]);

	return { session, loading, data, updateData };
}

export default usePasswordResetData;
