import { FC, useState } from "react";
import QuestionContext from "./QuestionContext";
import { QuestionPrivate } from "../../types/questionTypes";
import EditQuestionForm from "../../components/layout/EditQuestionForm/EditQuestionForm";
import QuestionListItem from "../../components/ui/QuestionListItem/QuestionListItem";

type QuestionProviderProps = {
	question: QuestionPrivate;
};

const QuestionProvider: FC<QuestionProviderProps> = ({ question }) => {
	// #region States
	const [showEditQuestionForm, setShowEditQuestionForm] = useState(false);
	// #endregion

	return (
		<QuestionContext.Provider value={{ question, showEditQuestionForm, setShowEditQuestionForm }}>
			{showEditQuestionForm ? <EditQuestionForm /> : <QuestionListItem />}
		</QuestionContext.Provider>
	);
};

export default QuestionProvider;
