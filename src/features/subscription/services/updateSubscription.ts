import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";

export default async function updateSubscription(userId: string, priceId: string): Promise<void> {
	// Get auth token
	const token = await getAuthToken();

	// Update subscription
	await axios.put(
		`/users/${userId}/subscription`,
		{ priceId },
		{
			headers: {
				Authorization: createBearerAuthHeader(token),
			},
		}
	);
}
