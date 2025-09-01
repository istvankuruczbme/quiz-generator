import z from "zod/v4";

export const answerOptionSchema = z.object({
	id: z.uuid("Invalid answer option ID."),
	text: z.string().trim().nonempty("Answer option text missing."),
	isCorrect: z.boolean(),
});
