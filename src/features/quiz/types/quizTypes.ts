import { Category } from "../../category/types/categoryTypes";
import { QuestionPrivate, QuestionPublic } from "../../question/types/questionTypes";
import { UserPublic } from "../../user/types/userTypes";

export type QuizConfig = {
	status: "DRAFT" | "ACTIVE" | "DELETED";
	visibility: "PUBLIC" | "PRIVATE";
	questionOrder: "NORMAL" | "RANDOM";
};

export type QuizData = {
	id: string;
	category: Category;
	title: string;
	description: string;
	photoUrl: string | null;
	updatedAt: Date;
	createdAt: Date;
	config: QuizConfig;
	user: UserPublic;
};

export type QuizSummary = QuizData & {
	questionCount: number;
	completionCount: number;
};

export type QuizFullPublic = QuizData & {
	questions: QuestionPublic[];
};
export type QuizFullPrivate = QuizData & {
	questions: QuestionPrivate[];
};
