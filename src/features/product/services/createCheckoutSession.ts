import { axios } from "../../../config/axios";

export default async function createCheckoutSession(
	customerId: string,
	priceId: string,
	successUrl?: string
): Promise<{ url: string }> {
	const { data } = await axios.post<{ url: string }>("/products/checkout", {
		customerId,
		priceId,
		successUrl,
	});
	return data;
}
