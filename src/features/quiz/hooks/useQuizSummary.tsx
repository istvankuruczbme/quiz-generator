import { useEffect, useState } from "react";
import { QuizSummary } from "../types/quizTypes";
import { useNavigate, useParams } from "react-router-dom";
import getQuizSummary from "../sevices/getQuizSummary";
import useError from "../../error/hooks/useError";

const useQuizSummary = () => {
	// #region States
	const [quizSummary, setQuizSummary] = useState<QuizSummary | null>(null);
	const [loading, setLoading] = useState(true);
	// #endregion

	// #region Hooks
	const { quizId } = useParams();
	const { setError } = useError();
	const navigate = useNavigate();
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
				// console.log("Error fetching the quiz.", err);
				setError(err);

				// Redirect to Quiz not found page
				navigate("/error/quiz-not-found", { replace: true });
			} finally {
				setLoading(false);
			}
		})();
	}, [quizId, setError, navigate]);

	return { quizSummary, loading };
};

export default useQuizSummary;
