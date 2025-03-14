import { axios } from "../../../config/axios";

export default async function updateSubscription(userId: string, priceId: string): Promise<void> {
	await axios.put(`/users/${userId}/subscription`, {
		priceId,
	});
}
