import { createContext } from "react";
import { SEARCH_QUIZ_FORM_DATA, SearchQuizFormData } from "../../constants/formData";
import { QuizSummary } from "../../types/quizTypes";

type QuizSearchContextType = {
	data: SearchQuizFormData;
	updateData: (newData: Partial<SearchQuizFormData>) => void;
	quizzes: QuizSummary[];
	loading: boolean;
};
const QuizSearchContext = createContext<QuizSearchContextType>({
	data: SEARCH_QUIZ_FORM_DATA,
	updateData: () => {},
	quizzes: [],
	loading: true,
});

export default QuizSearchContext;
