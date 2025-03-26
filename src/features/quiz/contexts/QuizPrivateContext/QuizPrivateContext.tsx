import { createContext, Dispatch, SetStateAction } from "react";
import { QuizFullPrivate } from "../../types/quizTypes";

type QuizPrivateContextType = {
	quiz: QuizFullPrivate | null;
	setQuiz: Dispatch<SetStateAction<QuizFullPrivate | null>>;
	loading: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
};

const QuizPrivateContext = createContext<QuizPrivateContextType>({
	quiz: null,
	setQuiz: () => {},
	loading: false,
	setLoading: () => {},
});

export default QuizPrivateContext;
