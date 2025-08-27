import { useEffect } from "react";
import useUser from "../../../contexts/UserContext/useUser";
import useFormData from "../../../hooks/form/useFormData";
import { EDIT_USER_FORM_DATA } from "../constants/formData";

const useEditUserData = () => {
	// #region States
	const [data, updateData] = useFormData(EDIT_USER_FORM_DATA);
	// #endregion

	// #region Hooks
	const { user, loading } = useUser();
	// #endregion

	useEffect(() => {
		// No user
		if (!user) {
			updateData(EDIT_USER_FORM_DATA);
			return;
		}

		// Update data with user data
		updateData({
			name: user.name,
			photoUrl: user.photoUrl ?? "",
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return { user, loading, data, updateData };
};

export default useEditUserData;
