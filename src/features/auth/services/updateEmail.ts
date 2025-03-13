import { axios } from "../../../config/axios";

export default async function updateEmail(userId: string, email: string): Promise<void> {
	await axios.put(`/users/${userId}/email`, { email });
}
