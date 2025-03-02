import { axios } from "../../../config/axios";
import { User } from "../types/userTypes";

export default async function getUser(id: string): Promise<User> {
	const { data } = await axios.get<User>(`/users/${id}`);
	return data;
}
