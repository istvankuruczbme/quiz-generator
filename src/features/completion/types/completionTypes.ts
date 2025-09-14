import { CompletionQuizPrivate, CompletionQuizPublic } from "../../quiz/types/quizTypes";
import { UserPublic } from "../../user/types/userTypes";

// #region Completion (public)
export type CompletionPublic = {
	id: string;
	updatedAt: string;
	createdAt: string;
	finishedAt: string | null;
	user: UserPublic;
	quiz: CompletionQuizPublic;
};
//#endregion

// #region Completion (private)
export type CompletionPrivate = {
	id: string;
	updatedAt: string;
	createdAt: string;
	finishedAt: string | null;
	user: UserPublic;
	quiz: CompletionQuizPrivate;
};
//#endregion
