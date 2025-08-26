import { supabase } from "../../../config/supabase";
import AppError from "../../error/classes/AppError";

export default async function setSession(tokens: {
	access_token: string;
	refresh_token: string;
}): Promise<void> {
	// Set session
	const { error } = await supabase.auth.setSession(tokens);

	// Check error
	if (error) throw new AppError({ message: "Error setting session.", details: error.message });
}
