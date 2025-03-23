import { Category } from "../../category/types/categoryTypes";

export type Quiz = {
	id: string;
	title: string;
	description: string;
	photoUrl: string | null;
	embedding: number[];
	updatedAt: Date;
	createdAt: Date;
	config: {
		id: string;
		status: "DRAFT" | "ACTIVE" | "DELETED";
		visibility: "PUBLIC" | "PRIVATE";
		questionOrder: "NORMAL" | "RANDOM";
		quizId: string;
	};
	category: Category;
};
