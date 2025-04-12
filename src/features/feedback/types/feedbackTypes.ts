export type FeedbackType = "success" | "error";
export type Feedback = {
	type: FeedbackType;
	message: string;
	details?: string;
};
