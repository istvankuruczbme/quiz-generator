import { axios } from "../../../config/axios";
import { UserProfile } from "../types/userTypes";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";

export default async function getUser(id: string, token: string): Promise<UserProfile> {
	// Get data from DB
	const { data } = await axios.get<UserProfile>(`/users/${id}`, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Return data
	return data;
}
