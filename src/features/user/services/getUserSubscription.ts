import Stripe from "stripe";
import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";

export default async function getUserSubscription(userId: string): Promise<Stripe.Subscription> {
	// Get session token
	const token = await getAuthToken();

	// Get data from DB
	const { data } = await axios.get<Stripe.Subscription>(`/users/${userId}/subscription`, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Return data
	return data;
}
