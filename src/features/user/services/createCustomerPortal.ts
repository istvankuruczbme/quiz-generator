import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";

export default async function createCustomerPortal(userId: string): Promise<{ url: string }> {
	// Get session token
	const token = await getAuthToken();

	// Get data from DB
	const { data } = await axios.post<{ url: string }>(`/users/${userId}/portal`, null, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Return data
	return data;
}
