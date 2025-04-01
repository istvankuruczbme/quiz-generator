import { createContext, Dispatch, SetStateAction } from "react";
import { QuestionPrivate } from "../../types/questionTypes";

type QuestionContextType = {
	question: QuestionPrivate;
	showEditQuestionForm: boolean;
	setShowEditQuestionForm: Dispatch<SetStateAction<boolean>>;
};

const QuestionContext = createContext<QuestionContextType>({
	question: {} as QuestionPrivate,
	showEditQuestionForm: false,
	setShowEditQuestionForm: () => {},
});

export default QuestionContext;
