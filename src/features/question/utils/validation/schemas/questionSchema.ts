import z from "zod/v4";
import { answerOptionSchema } from "../../../../answerOption/utils/validation/schemas/answerOptionSchema";

export const questionSchema = z
	.object({
		text: z.string().trim().nonempty("Question text missing."),
		photoUrl: z.union([z.url("Invalid photo URL."), z.null()]),
		photo: z.union([
			z.file().mime(["image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/webp"]),
			z.null(),
		]),
		points: z.object({
			correct: z.number("Correct points missing."),
			wrong: z.number("Wrong points missing."),
			empty: z.number("Empty points missing."),
		}),
		answerOptions: z.array(answerOptionSchema).min(1, "Answer options missing."),
	})
	.check((ctx) => {
		// Get answer options
		const { answerOptions } = ctx.value;

		// Check min 1 correct answer
		const correctAnswerOption = answerOptions.find((option) => option.isCorrect);
		if (!correctAnswerOption) {
			ctx.issues.push({
				input: answerOptions,
				path: ["answerOptions"],
				message: "No correct anwer option.",
				code: "custom",
			});
		}
	});
export type QuestionData = z.infer<typeof questionSchema>;
