import { User } from "@supabase/supabase-js";
import { supabase } from "../../../config/supabase";
import AppError from "../../error/classes/AppError";

export default async function getAuthUser(token: string): Promise<User> {
	// Get user
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser(token);

	// Check if there was an error
	if (error) {
		throw new AppError({ message: "Error fetching authenticated user.", details: error.message });
	}

	// Check user data
	if (!user) throw new AppError({ message: "No user." });

	// Return user
	return user;
}
