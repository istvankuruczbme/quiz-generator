import { FC, ReactNode, useState } from "react";
import DeleteQuestionModalContext from "./DeleteQuestionModalContext";
import { QuestionPrivate } from "../../types/questionTypes";

type DeleteQuestionModalProviderProps = {
	children: ReactNode;
};

const DeleteQuestionModalProvider: FC<DeleteQuestionModalProviderProps> = ({ children }) => {
	// #region States
	const [question, setQuestion] = useState<QuestionPrivate | null>(null);
	const [showModal, setShowModal] = useState(false);
	// #endregion

	return (
		<DeleteQuestionModalContext.Provider
			value={{ question, setQuestion, showModal, setShowModal }}
		>
			{children}
		</DeleteQuestionModalContext.Provider>
	);
};

export default DeleteQuestionModalProvider;
