import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";

export default async function updateUserCategories(
	categoryIds: string[],
	userId: string
): Promise<void> {
	// Get session token
	const token = await getAuthToken();

	// Send request
	await axios.put<string[]>(
		`/users/${userId}/categories`,
		{ categoryIds },
		{
			headers: {
				Authorization: createBearerAuthHeader(token),
			},
		}
	);
}
