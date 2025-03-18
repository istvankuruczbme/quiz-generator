import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";

export default async function deleteUser(id: string): Promise<void> {
	// Get session token
	const token = await getAuthToken();

	// Delete user from DB
	await axios.delete(`/users/${id}`, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});
}
