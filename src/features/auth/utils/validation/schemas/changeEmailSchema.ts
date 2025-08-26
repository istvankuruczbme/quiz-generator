import z from "zod/v4";

export const changeEmailSchema = z.object({
	email: z.email("Invalid email format."),
});
export type ChangeEmailData = z.infer<typeof changeEmailSchema>;
