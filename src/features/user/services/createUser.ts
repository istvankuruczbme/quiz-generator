import { axios } from "../../../config/axios";
import { InsertUserData } from "../types/userTypes";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";

export default async function createUser(token: string): Promise<void> {
	await axios.post<InsertUserData>("/users", null, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});
}
