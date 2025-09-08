import z from "zod/v4";

export const newCompletionQuestionSchema = z.object({
	selectedAnswerOptions: z
		.array(z.uuid("Invalid answer option ID."))
		.min(1, "Min 1 answer option must be selected."),
});
export type NewCompletionQuestionData = z.infer<typeof newCompletionQuestionSchema>;
