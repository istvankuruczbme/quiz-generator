import {
	AnswerOptionPrivate,
	AnswerOptionPublic,
} from "../../answerOption/types/answerOptionTypes";

export type QuestionPoints = {
	correct: number;
	wrong: number;
	empty: number;
};

export type QuestionPublic = {
	id: string;
	photoUrl: string | null;
	text: string;
	order: number;
	points: QuestionPoints;
	answerOptions: AnswerOptionPublic[];
};
export type QuestionPrivate = {
	id: string;
	photoUrl: string | null;
	text: string;
	order: number;
	points: QuestionPoints;
	answerOptions: AnswerOptionPrivate[];
};
