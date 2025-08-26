import { supabase } from "../../../config/supabase";
import AppError from "../../error/classes/AppError";

export default async function signInWithPassword(signInData: {
	email: string;
	password: string;
}): Promise<void> {
	// Get properties
	const { email, password } = signInData;

	// Sign in
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	// Check error
	if (error) throw new AppError({ message: "Error signing in.", details: error.message });
}
