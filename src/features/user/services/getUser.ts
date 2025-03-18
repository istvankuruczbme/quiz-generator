import { axios } from "../../../config/axios";
import { User } from "../types/userTypes";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";

export default async function getUser(id: string, token: string): Promise<User> {
	// Get data from DB
	const { data } = await axios.get<User>(`/users/${id}`, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Return data
	return data;
}
