import { useEffect, useState } from "react";
import useFeedback from "../../ui/feedback/contexts/FeedbackContext/useFeedback";
import AppError from "../classes/AppError";
import { AxiosError } from "axios";
import checkServerAppError from "../utils/checkServerAppError";

const useError = () => {
	// #region States
	const [error, setError] = useState<unknown>(null);
	// #endregion

	// #region Hooks
	const { setFeedback } = useFeedback();
	// #endregion

	useEffect(() => {
		// Check error
		if (error == null) return;

		// Log error
		console.log(error);

		// App error
		if (error instanceof AppError) {
			setFeedback({
				type: "error",
				message: error.message,
				details: error.details,
			});
		}

		// Server error
		if (error instanceof AxiosError) {
			// Error data
			const errorData = error.response?.data;

			// Server app error
			if (checkServerAppError(errorData)) {
				setFeedback({
					type: "error",
					message: errorData.message,
					details: errorData.details,
				});
			}
		}
	}, [error, setFeedback]);

	return { setError };
};

export default useError;
