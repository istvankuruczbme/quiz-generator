import { createContext, Dispatch, SetStateAction } from "react";
import { QuestionPublic } from "../../../question/types/questionTypes";
import { CompletionPublic } from "../../types/completionTypes";
import { CompletionQuestionPrivate } from "../../../completionQuestion/types/completionQuestionTypes";

type CompletionPublicContextType = {
	completion: CompletionPublic | null;
	loading: boolean;
	question: QuestionPublic | null;
	questionNumber: number;
	completionQuestion: CompletionQuestionPrivate | null;
	setCompletionQuestion: Dispatch<SetStateAction<CompletionQuestionPrivate | null>>;
	selectedAnswerOptions: string[];
	handleAnswerOptionChange: (optionId: string) => void;
	removeAnswerOptions: (optionIds: string[]) => void;
	resetAnswerOptions: () => void;
	goToNextQuestion: () => void;
};
const CompletionPublicContext = createContext<CompletionPublicContextType>({
	completion: null,
	loading: true,
	question: null,
	questionNumber: 0,
	completionQuestion: null,
	setCompletionQuestion: () => {},
	selectedAnswerOptions: [],
	handleAnswerOptionChange: () => {},
	removeAnswerOptions: () => {},
	resetAnswerOptions: () => {},
	goToNextQuestion: () => {},
});

export default CompletionPublicContext;
