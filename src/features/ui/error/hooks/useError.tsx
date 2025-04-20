import { useCallback, useEffect, useState } from "react";
import errors, { ErrorCode, ErrorDetails } from "../assets/errors";
import useFeedback from "../../feedback/contexts/FeedbackContext/useFeedback";
import getAxiosErrorMessage from "../../../../utils/axios/getAxiosErrorMessage";
import checkAxiosError from "../../../../utils/axios/checkAxiosError";

const useError = () => {
	// #region States
	const [error, setError] = useState<unknown>(null);
	// #endregion

	// #region Hooks
	const { setFeedback } = useFeedback();
	// #endregion

	// #region Functions
	const getErrorDetails = useCallback((): ErrorDetails => {
		// Server error
		if (checkAxiosError(error)) {
			const errorMessage = getAxiosErrorMessage(error);
			return errors[errorMessage as ErrorCode];
		}

		// Custom error
		if (error instanceof Error) {
			return errors[error.message as ErrorCode];
		}

		// Return default error
		return errors.default;
	}, [error]);
	// #endregion

	useEffect(() => {
		// Check error
		if (error == null) return;

		// Get error details
		const errorDetails = getErrorDetails();

		// Set feedback
		setFeedback({
			type: "error",
			...errorDetails,
		});
	}, [error, getErrorDetails, setFeedback]);

	return { setError };
};

export default useError;
