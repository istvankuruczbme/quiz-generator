import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";

export default async function createCheckoutSession(
	userId: string,
	priceId: string,
	successUrl?: string
): Promise<{ url: string }> {
	// Get session token
	const token = await getAuthToken();

	// Send request
	const { data } = await axios.post<{ url: string }>(
		"/products/checkout",
		{
			userId,
			priceId,
			successUrl,
		},
		{
			headers: {
				Authorization: createBearerAuthHeader(token),
			},
		}
	);

	// Return data
	return data;
}
