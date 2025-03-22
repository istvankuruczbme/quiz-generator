export type Quiz = {
	id: string;
	categoryId: string;
	title: string;
	description: string;
	photoUrl: string | null;
	embedding: number[];
	updatedAt: Date;
	createdAt: Date;
	deletedAt: Date | null;
	userId: string;
	config: {
		id: string;
		status: "DRAFT" | "ACTIVE" | "DELETED";
		visibility: "PUBLIC" | "PRIVATE";
		questionOrder: "NORMAL" | "RANDOM";
		quizId: string;
	};
};
