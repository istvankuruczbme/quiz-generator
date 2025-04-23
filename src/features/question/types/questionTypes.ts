import {
	AnswerOptionPrivate,
	AnswerOptionPublic,
} from "../../answerOption/types/answerOptionTypes";

export type QuestionPoints = Readonly<{
	correct: number;
	wrong: number;
	empty: number;
}>;

export type QuestionPublic = Readonly<{
	id: string;
	photoUrl: string | null;
	text: string;
	order: number;
	points: QuestionPoints;
	answerOptions: AnswerOptionPublic[];
}>;
export type QuestionPrivate = Readonly<{
	id: string;
	photoUrl: string | null;
	text: string;
	order: number;
	points: QuestionPoints;
	answerOptions: AnswerOptionPrivate[];
}>;

export type QuestionGenerationStrategy = "RANDOM" | "TFIDF" | "EMBEDDING";
