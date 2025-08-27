import { axios } from "../../../config/axios";
import getSession from "../../auth/services/getSession";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";

export default async function updateSubscription(subscriptionData: {
	priceId: string;
}): Promise<void> {
	// Get session
	const session = await getSession();

	// Update subscription
	await axios.put(`/users/${session.user.id}/subscription`, subscriptionData, {
		headers: {
			Authorization: createBearerAuthHeader(session.access_token),
		},
	});
}
