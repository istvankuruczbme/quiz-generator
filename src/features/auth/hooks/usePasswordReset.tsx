import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getPasswordResetFlag from "../utils/getPasswordResetFlag";

const usePasswordReset = () => {
	// #region Hooks
	const navigate = useNavigate();
	// #endregion

	// #region Variables
	const isPasswordReset = getPasswordResetFlag();
	// #endregion

	useEffect(() => {
		if (!isPasswordReset) {
			navigate("/page-not-found");
			return;
		}
	}, [isPasswordReset, navigate]);
};

export default usePasswordReset;
