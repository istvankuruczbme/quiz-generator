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

	function updateQuestionsOrder(questionIds: string[]): void {
		// Check quiz
		if (quiz == null) return;

		// Reorder questions
		const newQuestions = questionIds.map((id) => {
			// Get question with ID
			const question = quiz.questions.find((question) => question.id === id);

			// Check if question exists
			if (question == undefined) throw new Error("question/not-found");

			// Return question
			return question;
		});

		// Update quiz state
		setQuiz((quiz) => {
			if (quiz == null) return null;
			return {
				...quiz,
				questions: newQuestions,
			};
		});
	}
	//#endregion

	return (
		<QuizPrivateContext.Provider
			value={{ quiz, setQuiz, loading, setLoading, updateQuizState, updateQuestionsOrder }}
		>
			{children}
		</QuizPrivateContext.Provider>
	);
};

export default QuizPrivateProvider;
