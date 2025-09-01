import { ChangeEvent, createContext } from "react";
import { AnswerOptionEditableProperty } from "../../../answerOption/types/answerOptionTypes";
import { QuestionPrivate } from "../../types/questionTypes";
import { EDIT_QUESTION_FORM_DATA, EditQuestionFormData } from "../../constants/formData";

type EditQuestionContextType = {
	question?: QuestionPrivate;
	data: EditQuestionFormData;
	updateData: (data: Partial<EditQuestionFormData>) => void;
	addAnswerOption: () => void;
	updateAnswerOption: (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		id: string,
		property: AnswerOptionEditableProperty
	) => void;
	removeAnswerOption: (id: string) => void;
};

const EditQuestionContext = createContext<EditQuestionContextType>({
	data: EDIT_QUESTION_FORM_DATA,
	updateData: () => null,
	addAnswerOption: () => {},
	updateAnswerOption: () => {},
	removeAnswerOption: () => {},
});

export default EditQuestionContext;
