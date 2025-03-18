import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";

export default async function updateUserEmail(userId: string, email: string): Promise<void> {
	// Get session token
	const token = await getAuthToken();

	// Send request to DB
	await axios.put(
		`/users/${userId}/email`,
		{ email },
		{
			headers: {
				Authorization: createBearerAuthHeader(token),
			},
		}
	);
}
