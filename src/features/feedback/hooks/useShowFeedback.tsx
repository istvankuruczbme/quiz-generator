import { useEffect, useRef, useState } from "react";
import { Feedback } from "../types/feedbackTypes";
import useFeedback from "../contexts/FeedbackContext/useFeedback";

const useShowFeedback = (feedback: Feedback) => {
	// #region States
	const [isOpen, setIsOpen] = useState(false);
	//#endregion

	// #region Refs
	const timeoutRef = useRef<NodeJS.Timeout>(undefined);
	// #endregion

	// #region States
	const { setFeedback } = useFeedback();
	// #endregion

	// #region Functions
	function showFeedback(): void {
		setIsOpen(true);
	}

	function closeFeedback(): void {
		setIsOpen(false);
	}
	// #endregion

	// Show feedback if its content changes
	const feedbackString = JSON.stringify(feedback);
	useEffect(() => {
		// Check valid feedback
		if (feedback.message === "") return;

		// Clear previous feedback
		clearTimeout(timeoutRef.current);

		// Show feedback
		showFeedback();

		// Close feedback after 10 s
		timeoutRef.current = setTimeout(() => {
			closeFeedback();

			setTimeout(() => {
				setFeedback({
					type: "error",
					message: "",
					details: "",
				});
			}, 200);
		}, 10 * 1000);

		return () => clearTimeout(timeoutRef.current);
	}, [feedback, feedbackString, setFeedback]);

	return { isOpen, closeFeedback };
};

export default useShowFeedback;
