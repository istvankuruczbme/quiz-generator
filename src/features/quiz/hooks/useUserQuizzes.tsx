import { useEffect, useState } from "react";
import { QuizSummary } from "../types/quizTypes";
import useUser from "../../../contexts/UserContext/useUser";
import getUserQuizzes from "../sevices/getUserQuizzes";

const useUserQuizzes = () => {
	// #region States
	const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);
	const [loading, setLoading] = useState(true);
	//#endregion

	//#region Hooks
	const { user } = useUser();
	//#endregion

	useEffect(() => {
		if (user == null) {
			setQuizzes([]);
			return;
		}

		(async function fetchQuizzes() {
			setLoading(true);

			try {
				// Get user quizzes
				const quizzes = await getUserQuizzes();

				// Update quizzes states
				setQuizzes(quizzes);
			} catch (err) {
				console.log("Error fething the quizzes of the user.", err);
			} finally {
				setLoading(false);
			}
		})();
	}, [user]);

	return { quizzes, loading };
};

export default useUserQuizzes;
