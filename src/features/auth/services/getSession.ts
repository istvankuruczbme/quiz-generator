import { Session } from "@supabase/supabase-js";
import { supabase } from "../../../config/supabase";
import AppError from "../../error/classes/AppError";

export default async function getSession(): Promise<Session> {
	// Get session
	const {
		data: { session },
		error,
	} = await supabase.auth.getSession();

	// Check error
	if (error) {
		throw new AppError({ message: "Error getting auth session.", details: error.message });
	}

	// Check session
	if (!session) throw new AppError({ message: "No session." });

	// Return session
	return session;
}
