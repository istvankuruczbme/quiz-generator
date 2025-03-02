import { axios } from "../../../config/axios";
import { Subscription } from "../types/subscriptionTypes";

export default async function getSubscriptions(userId: string): Promise<Subscription[]> {
	const { data } = await axios.get<Subscription[]>(`/subscriptions?userId=${userId}`);
	return data;
}
