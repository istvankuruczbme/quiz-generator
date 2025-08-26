import getSession from "./getSession";

export default async function getAuthToken(): Promise<string> {
	// Get current sesssion from Supabase
	const session = await getSession();

	// Return token
	return session.access_token;
}
