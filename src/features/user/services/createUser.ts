import { axios } from "../../../config/axios";
import { InsertUserData } from "../types/userTypes";

export default async function createUser(
	id: string,
	name: string,
	email: string,
	photoUrl: string | null
): Promise<void> {
	await axios.post<InsertUserData>("/users", {
		id,
		name,
		email,
		photoUrl,
	});
}
