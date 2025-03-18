import { supabase } from "../../../config/supabase";

export default async function getAuthToken(): Promise<string> {
	// Get current sesssion from Supabase
	const { data, error } = await supabase.auth.getSession();

	// Check error
	if (error != null) throw new Error("auth/session-error");

	// Get session from response
	const session = data.session;

	// Check session
	if (session == null) throw new Error("auth/session-missing");

	// Return token
	return session.access_token;
}
