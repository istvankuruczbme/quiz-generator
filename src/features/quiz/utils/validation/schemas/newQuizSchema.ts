import z from "zod/v4";

export const newQuizSchema = z.object({
	title: z.string().trim().nonempty("Title missing."),
	description: z.string().trim().nonempty("Description missing."),
	photo: z.union([z.file(), z.null()]),
	categoryId: z.uuid("Invalid category."),
});
export type NewQuizData = z.infer<typeof newQuizSchema>;
