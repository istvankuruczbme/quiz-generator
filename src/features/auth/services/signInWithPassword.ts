import { supabase } from "../../../config/supabase";

export default async function signInWithPassword(email: string, password: string): Promise<void> {
	// Sign in
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	// Check error
	if (error != null) throw error;
}
