import { FC, useState } from "react";
import QuestionContext from "./QuestionContext";
import { QuestionPrivate } from "../../types/questionTypes";
import QuestionListItem from "../../components/ui/QuestionListItem/QuestionListItem";
import EditQuestion from "../../components/layout/EditQuestion/EditQuestion";
import EditQuestionProvider from "../EditQuestionContext/EditQuestionProvider";

type QuestionProviderProps = {
	question: QuestionPrivate;
};

const QuestionProvider: FC<QuestionProviderProps> = ({ question }) => {
	// #region States
	const [showEditQuestionForm, setShowEditQuestionForm] = useState(false);
	// #endregion

	return (
		<QuestionContext.Provider value={{ question, showEditQuestionForm, setShowEditQuestionForm }}>
			{showEditQuestionForm ? (
				<EditQuestionProvider question={question}>
					<EditQuestion hideForm={() => setShowEditQuestionForm(false)} />
				</EditQuestionProvider>
			) : (
				<QuestionListItem />
			)}
		</QuestionContext.Provider>
	);
};

export default QuestionProvider;
