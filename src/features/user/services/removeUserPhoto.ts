import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";

export default async function removeUserPhoto(userId: string): Promise<void> {
	// Get auth token
	const token = await getAuthToken();

	// Remove user photo
	await axios.delete(`/users/${userId}/photo`, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});
}
