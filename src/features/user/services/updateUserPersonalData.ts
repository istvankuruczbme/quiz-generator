import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";

export default async function updateUserPersonalData(
	id: string,
	name: string,
	photo: File | undefined
): Promise<void> {
	// Get session token
	const token = await getAuthToken();

	// Create form data
	const userPersonalData = new FormData();
	userPersonalData.append("name", name);
	if (photo != undefined) userPersonalData.append("file", photo);

	// Send request to DB
	await axios.put(`/users/${id}/personal`, userPersonalData, {
		headers: {
			Authorization: createBearerAuthHeader(token),
			"Content-Type": "multipart/form-data",
		},
	});
}
