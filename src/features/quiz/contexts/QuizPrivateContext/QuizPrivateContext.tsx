import { createContext, Dispatch, SetStateAction } from "react";
import { QuizFullPrivate } from "../../types/quizTypes";

type QuizPrivateContextType = {
	quiz: QuizFullPrivate | null;
	setQuiz: Dispatch<SetStateAction<QuizFullPrivate | null>>;
	loading: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
	updateQuizState: () => Promise<void>;
	updateQuestionsOrder: (questionIds: string[]) => void;
};

const QuizPrivateContext = createContext<QuizPrivateContextType>({
	quiz: null,
	setQuiz: () => {},
	loading: false,
	setLoading: () => {},
	updateQuizState: async () => {},
	updateQuestionsOrder: () => {},
});

export default QuizPrivateContext;
