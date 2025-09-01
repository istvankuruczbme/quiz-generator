import { createContext, Dispatch, SetStateAction } from "react";
import { QuestionPrivate } from "../../types/questionTypes";

type DeleteQuestionModalContextType = {
	question: QuestionPrivate | null;
	setQuestion: Dispatch<SetStateAction<QuestionPrivate | null>>;
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
};

const DeleteQuestionModalContext = createContext<DeleteQuestionModalContextType>({
	question: null,
	setQuestion: () => {},
	showModal: false,
	setShowModal: () => {},
});

export default DeleteQuestionModalContext;
