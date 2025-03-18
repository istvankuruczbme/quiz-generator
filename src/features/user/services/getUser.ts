import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import { User } from "../types/userTypes";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";

export default async function getUser(id: string): Promise<User> {
	// Get session token
	const token = await getAuthToken();

	// Get data from DB
	const { data } = await axios.get<User>(`/users/${id}`, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Return data
	return data;
}
