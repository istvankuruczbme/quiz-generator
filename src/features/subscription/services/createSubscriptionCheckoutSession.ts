import { axios } from "../../../config/axios";

export default async function createSubscriptionCheckoutSession(
	customerId: string,
	priceId: string,
	successUrl?: string
): Promise<{ url: string }> {
	const { data } = await axios.post<{ url: string }>("/subscriptions/checkout", {
		customerId,
		priceId,
		successUrl,
	});
	return data;
}
