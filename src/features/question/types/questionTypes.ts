import { AnswerOption } from "../../answerOption/types/answerOptionTypes";

export type QuestionPoints = {
	correct: number;
	wrong: number;
	empty: number;
};

export type Question = {
	id: string;
	photoUrl: string | null;
	text: string;
	order: number;
	points: QuestionPoints;
	answerOptions: AnswerOption[];
};
