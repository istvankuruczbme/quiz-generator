import {
	AnswerOptionData,
	AnswerOptionPrivate,
	AnswerOptionPublic,
} from "../../answerOption/types/answerOptionTypes";
import { QuestionGenerationStrategy } from "../constants/generation";

// #region Question points
export type QuestionPoints = Readonly<{
	correct: number;
	wrong: number;
	empty: number;
}>;
// #endregion

// #region Question (public)
export type QuestionPublic = Readonly<{
	id: string;
	photoUrl: string | null;
	text: string;
	order: number;
	points: QuestionPoints;
	answerOptions: AnswerOptionPublic[];
}>;
// #endregion

// #region Question (private)
export type QuestionPrivate = Readonly<{
	id: string;
	photoUrl: string | null;
	text: string;
	order: number;
	points: QuestionPoints;
	answerOptions: AnswerOptionPrivate[];
}>;
// #endregion

// #region Question generation
export type EditQuizQuestionGenerationTransformedData = {
	file: File | null;
	strategy: QuestionGenerationStrategy;
	creativity: number;
	questionCount: number;
	answerOptionCount: number;
};
// #endregion

// #region Question data
export type NewQuestionData = {
	text: string;
	photo: File | null;
	order: number;
	points: QuestionPoints;
	answerOptions: AnswerOptionData[];
};

export type EditQuestionData = Partial<{
	text: string;
	photoUrl: string | null;
	photo: File | null;
	order: number;
	points: QuestionPoints;
	answerOptions: AnswerOptionData[];
}>;
// #endregion
