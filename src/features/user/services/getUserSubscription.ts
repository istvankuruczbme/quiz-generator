import Stripe from "stripe";
import { axios } from "../../../config/axios";

export default async function getUserSubscription(userId: string): Promise<Stripe.Subscription> {
	const { data } = await axios.get<Stripe.Subscription>(`/users/${userId}/subscription`);
	return data;
}
