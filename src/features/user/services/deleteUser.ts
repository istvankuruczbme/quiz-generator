import { axios } from "../../../config/axios";

export default async function deleteUser(id: string): Promise<void> {
	await axios.delete(`/users/${id}`);
}
