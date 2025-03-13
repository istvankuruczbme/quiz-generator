import { axios } from "../../../config/axios";

export default async function createCustomerPortal(userId: string): Promise<{ url: string }> {
	const { data } = await axios.post<{ url: string }>(`/users/${userId}/portal`);
	return data;
}
