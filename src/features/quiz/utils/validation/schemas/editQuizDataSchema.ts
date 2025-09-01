import z from "zod/v4";

export const editQuizDataSchema = z
	.object({
		title: z.string().trim().nonempty("Title missing."),
		description: z.string().trim().nonempty("Description missing."),
		photoUrl: z.union([z.url("Invalid photo URL."), z.null()]),
		photo: z.union([z.file(), z.null()]),
		categoryId: z.uuid("Invalid category."),
	})
	.partial();
export type EditQuizData = z.infer<typeof editQuizDataSchema>;
