import { useEffect, useState } from "react";
import { QuizSummary } from "../types/quizTypes";
import { useParams } from "react-router-dom";
import getQuizSummary from "../sevices/getQuizSummary";

const useQuizSummary = () => {
	// #region States
	const [quizSummary, setQuizSummary] = useState<QuizSummary | null>(null);
	const [loading, setLoading] = useState(true);
	// #endregion

	// #region Hooks
	const { quizId } = useParams();
	// #endregion

	useEffect(() => {
		if (quizId == undefined) {
			setQuizSummary(null);
			return;
		}

		(async function fetchQuizSummary() {
			setLoading(true);

			try {
				// Get quiz summary
				const quizSummary = await getQuizSummary(quizId);

				// Update quiz summary state
				setQuizSummary(quizSummary);
			} catch (err) {
				console.log("Error fetching the quiz.", err);
			} finally {
				setLoading(false);
			}
		})();
	}, [quizId]);

	return { quizSummary, loading };
};

export default useQuizSummary;
