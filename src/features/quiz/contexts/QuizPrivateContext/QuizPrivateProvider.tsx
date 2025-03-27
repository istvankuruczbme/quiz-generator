import { FC, ReactNode } from "react";
import QuizPrivateContext from "./QuizPrivateContext";
import useQuiz from "../../hooks/useQuiz";
import getQuiz from "../../sevices/getQuiz";

type QuizPrivateProviderProps = {
	children: ReactNode;
};

const QuizPrivateProvider: FC<QuizPrivateProviderProps> = ({ children }) => {
	// #region Hook
	const { quiz, setQuiz, loading, setLoading } = useQuiz();
	//#endregion

	//#region Functions
	async function updateQuizState(): Promise<void> {
		if (quiz == null) return;

		setLoading(true);

		try {
			// Get quiz
			const updatedQuiz = await getQuiz(quiz.id);

			// Update quiz state
			setQuiz(updatedQuiz);
		} catch (err) {
			console.log("Error fetching the quiz from DB.", err);
		} finally {
			setLoading(false);
		}
	}
	//#endregion

	return (
		<QuizPrivateContext.Provider value={{ quiz, setQuiz, loading, setLoading, updateQuizState }}>
			{children}
		</QuizPrivateContext.Provider>
	);
};

export default QuizPrivateProvider;
