import { User } from "@supabase/supabase-js";
import { supabase } from "../../../config/supabase";

export default async function signUpWithPassword(
	name: string,
	email: string,
	password: string
): Promise<User> {
	// Sign up
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: { name },
		},
	});

	// Check error
	if (error != null) throw error;

	// Check user
	if (data.user == null) throw new Error("user/not-created");

	// Return user
	return data.user;
}
