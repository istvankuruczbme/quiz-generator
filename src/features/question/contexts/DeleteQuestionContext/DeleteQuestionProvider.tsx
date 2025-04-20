import { FC, ReactNode, useState } from "react";
import DeleteQuestionContext from "./DeleteQuestionContext";
import { QuestionPrivate } from "../../types/questionTypes";

type DeleteQuestionProviderProps = {
	children: ReactNode;
};

const DeleteQuestionProvider: FC<DeleteQuestionProviderProps> = ({ children }) => {
	// #region States
	const [question, setQuestion] = useState<QuestionPrivate | null>(null);
	const [showModal, setShowModal] = useState(false);
	// #endregion

	return (
		<DeleteQuestionContext.Provider value={{ question, setQuestion, showModal, setShowModal }}>
			{children}
		</DeleteQuestionContext.Provider>
	);
};

export default DeleteQuestionProvider;
