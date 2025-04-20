import { createContext, Dispatch, SetStateAction } from "react";
import { QuestionPrivate } from "../../types/questionTypes";

type DeleteQuestionContextType = {
	question: QuestionPrivate | null;
	setQuestion: Dispatch<SetStateAction<QuestionPrivate | null>>;
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
};

const DeleteQuestionContext = createContext<DeleteQuestionContextType>({
	question: null,
	setQuestion: () => {},
	showModal: false,
	setShowModal: () => {},
});

export default DeleteQuestionContext;
