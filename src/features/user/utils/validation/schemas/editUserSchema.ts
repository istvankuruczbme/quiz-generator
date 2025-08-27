import z from "zod";

export const editUserSchema = z
	.object({
		name: z.string().trim().nonempty("Name missing."),
		photoUrl: z.union([z.url("Invalid photo URL."), z.null()]),
	})
	.partial();
export type EditUserData = z.infer<typeof editUserSchema>;
