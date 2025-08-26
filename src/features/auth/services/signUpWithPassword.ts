import { supabase } from "../../../config/supabase";
import AppError from "../../error/classes/AppError";

export default async function signUpWithPassword(singUpData: {
	name: string;
	email: string;
	password: string;
}): Promise<void> {
	// Get properties
	const { name, email, password } = singUpData;

	// Send confirmation email
	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${import.meta.env.VITE_CLIENT_URL}/`,
			data: {
				full_name: name,
				avatar_url: null,
			},
		},
	});

	// Check error
	if (error) throw new AppError({ message: "Error sending email confirmation mail." });
}
