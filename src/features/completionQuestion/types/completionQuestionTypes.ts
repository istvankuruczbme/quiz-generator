import { QuestionPrivate, QuestionPublic } from "../../question/types/questionTypes";

// #region Completion question (public)
export type CompletionQuestionPublic = QuestionPublic & {
	completion?: { selectedAnswerOptionIds: string[]; answeredAt: string };
};
// #endregion

// #region Completion question (private)
export type CompletionQuestionPrivate = QuestionPrivate & {
	completion: { selectedAnswerOptionIds: string[]; answeredAt: string };
};
// #endregion
