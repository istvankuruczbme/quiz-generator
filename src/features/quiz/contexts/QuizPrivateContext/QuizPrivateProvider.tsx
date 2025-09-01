import { FC, ReactNode } from "react";
import QuizPrivateContext from "./QuizPrivateContext";
import useGetQuizPrivate from "../../hooks/useGetQuizPrivate";

type QuizPrivateProviderProps = {
	children: ReactNode;
};

const QuizPrivateProvider: FC<QuizPrivateProviderProps> = ({ children }) => {
	// #region Hook
	const { quiz, loading } = useGetQuizPrivate();
	//#endregion

	return (
		<QuizPrivateContext.Provider value={{ quiz, loading }}>
			{children}
		</QuizPrivateContext.Provider>
	);
};

export default QuizPrivateProvider;

// function updateQuestionsOrder(questionIds: string[]): void {
// 	// Check quiz
// 	if (quiz == null) return;

// 	// Reorder questions
// 	const newQuestions = questionIds.map((id) => {
// 		// Get question with ID
// 		const question = quiz.questions.find((question) => question.id === id);

// 		// Check if question exists
// 		if (question == undefined) throw new Error("question/not-found");

// 		// Return question
// 		return question;
// 	});

// 	// Update quiz state
// 	setQuiz((quiz) => {
// 		if (quiz == null) return null;
// 		return {
// 			...quiz,
// 			questions: newQuestions,
// 		};
// 	});
// }
