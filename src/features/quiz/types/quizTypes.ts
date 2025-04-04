import { Category } from "../../category/types/categoryTypes";
import { QuestionOrder } from "../assets/questionOrder";
import { QuestionPrivate, QuestionPublic } from "../../question/types/questionTypes";
import { UserPublic } from "../../user/types/userTypes";
import { QuizVisibility } from "../assets/quizVisibility";

export type QuizConfig = {
	status: "DRAFT" | "ACTIVE";
	visibility: QuizVisibility;
	questionOrder: QuestionOrder;
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
