import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useResetPasswordEmail = () => {
	// #region States
	const [email, setEmail] = useState("");
	// #endregion

	// #region Hooks
	const [searchParams] = useSearchParams();
	// #endregion

	// #region Variables
	const emailParam = searchParams.get("email");
	// #endregion

	useEffect(() => {
		setEmail(emailParam || "");
	}, [emailParam]);

	return { email, setEmail };
};

export default useResetPasswordEmail;
