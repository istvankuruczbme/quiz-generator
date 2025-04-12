import { User } from "@supabase/supabase-js";
import { supabase } from "../../../config/supabase";

export default async function getAuthUser(token: string): Promise<User> {
	// Get user
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser(token);

	// Check if there was an error
	if (error != null) throw error;

	// Check user data
	if (user == null) throw new Error("auth/no-user");

	// Return user
	return user;
}
