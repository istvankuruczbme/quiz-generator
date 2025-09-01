import { createContext } from "react";
import { QuizPrivate } from "../../types/quizTypes";

type QuizPrivateContextType = {
	quiz: QuizPrivate | null;
	loading: boolean;
};

const QuizPrivateContext = createContext<QuizPrivateContextType>({
	quiz: null,
	loading: true,
});

export default QuizPrivateContext;
