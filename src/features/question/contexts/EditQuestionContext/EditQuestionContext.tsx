import { ChangeEvent, createContext, Dispatch, SetStateAction } from "react";
import {
	AnswerOptionEditableProperty,
	AnswerOptionPrivate,
} from "../../../answerOption/types/answerOptionTypes";
import { QuestionPrivate } from "../../types/questionTypes";

type EditQuestionContextType = {
	question?: QuestionPrivate;
	text: string;
	setText: Dispatch<SetStateAction<string>>;
	photoUrl: string;
	setPhotoUrl: Dispatch<SetStateAction<string>>;
	correct: number;
	setCorrect: Dispatch<SetStateAction<number>>;
	wrong: number;
	setWrong: Dispatch<SetStateAction<number>>;
	empty: number;
	setEmpty: Dispatch<SetStateAction<number>>;
	answerOptions: AnswerOptionPrivate[];
	setAnswerOptions: Dispatch<SetStateAction<AnswerOptionPrivate[]>>;
	addAnswerOption: () => void;
	updateAnswerOption: (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		id: string,
		property: AnswerOptionEditableProperty
	) => void;
	removeAnswerOption: (id: string) => void;
};

const EditQuestionContext = createContext<EditQuestionContextType>({
	text: "",
	setText: () => {},
	photoUrl: "",
	setPhotoUrl: () => {},
	correct: 1,
	setCorrect: () => {},
	wrong: 0,
	setWrong: () => {},
	empty: 0,
	setEmpty: () => {},
	answerOptions: [],
	setAnswerOptions: () => {},
	addAnswerOption: () => {},
	updateAnswerOption: () => {},
	removeAnswerOption: () => {},
});

export default EditQuestionContext;
