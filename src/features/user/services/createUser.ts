import { axios } from "../../../config/axios";
import { User } from "../types/userTypes";

export default async function createUser(id: string, name: string, email: string): Promise<void> {
	await axios.post<User>("/users", {
		id,
		name,
		email,
	});
}
