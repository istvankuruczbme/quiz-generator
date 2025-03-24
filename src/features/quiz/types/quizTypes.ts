import { CategoryName } from "../../category/types/categoryTypes";
import { Question } from "../../question/types/questionTypes";
import { UserPublic } from "../../user/types/userTypes";

export type QuizConfig = {
	status: "DRAFT" | "ACTIVE" | "DELETED";
	visibility: "PUBLIC" | "PRIVATE";
	questionOrder: "NORMAL" | "RANDOM";
};

export type QuizSummary = {
	id: string;
	category: CategoryName;
	title: string;
	description: string;
	photoUrl: string | null;
	updatedAt: Date;
	createdAt: Date;
	config: QuizConfig;
	user: UserPublic;
	questionCount: number;
	completionCount: number;
};

export type QuizFull = {
	id: string;
	photoUrl: string | null;
	updatedAt: Date;
	createdAt: Date;
	description: string;
	title: string;
	config: QuizConfig;
	category: CategoryName;
	user: UserPublic;
	questions: Question[];
};
