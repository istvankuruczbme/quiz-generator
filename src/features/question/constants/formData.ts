import { AnswerOption } from "../../answerOption/types/answerOptionTypes";

// Edit question
export const EDIT_QUESTION_FORM_DATA = {
	text: "",
	photoUrl: null as string | null,
	photo: null as File | null,
	correct: "1",
	wrong: "0",
	empty: "0",
	answerOptions: [] as AnswerOption[],
};
export type EditQuestionFormData = typeof EDIT_QUESTION_FORM_DATA;
