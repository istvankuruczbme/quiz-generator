import { useEffect, useState } from "react";
import { QuizFullPrivate } from "../types/quizTypes";
import { useParams } from "react-router-dom";
import getQuiz from "../sevices/getQuiz";

const useQuiz = () => {
	//#region States
	const [quiz, setQuiz] = useState<QuizFullPrivate | null>(null);
	const [loading, setLoading] = useState(false);
	//#endregion

	//#region Hooks
	const { quizId } = useParams();
	//#endregion

	useEffect(() => {
		if (quizId == undefined) {
			setQuiz(null);
			return;
		}

		(async function fetchQuiz() {
			setLoading(true);

			try {
				// Get quiz
				const quiz = await getQuiz(quizId);

				// Update quiz state
				setQuiz(quiz);
			} catch (err) {
				console.log("Erro fetching the quiz.", err);
			} finally {
				setLoading(false);
			}
		})();
	}, [quizId]);

	return { quiz, loading };
};

export default useQuiz;
