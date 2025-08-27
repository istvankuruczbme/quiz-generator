import Stripe from "stripe";
import { axios } from "../../../config/axios";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";
import getSession from "../../auth/services/getSession";

export default async function getUserSubscription(): Promise<Stripe.Subscription> {
	// Get session
	const session = await getSession();

	// Get data from DB
	const { data } = await axios.get<Stripe.Subscription>(`/users/${session.user.id}/subscription`, {
		headers: {
			Authorization: createBearerAuthHeader(session.access_token),
		},
	});

	// Return data
	return data;
}
