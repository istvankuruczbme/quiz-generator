import { axios } from "../../../config/axios";
import getSession from "../../auth/services/getSession";
import { UserProfile } from "../types/userTypes";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";

export default async function updateUser(
	data: Partial<{
		name: string;
		photoUrl: string | null;
		photo: File | null;
	}>
): Promise<UserProfile> {
	// Get data properties
	const { name, photoUrl, photo } = data;

	// Get session
	const session = await getSession();

	// Create form data
	const userData = new FormData();
	if (photo != undefined) userData.append("file", photo);
	userData.append("data", JSON.stringify({ name, photoUrl }));

	// Send request
	const { data: user } = await axios.put<UserProfile>(
		`/users/${session.user.id}/personal`,
		userData,
		{
			headers: {
				Authorization: createBearerAuthHeader(session.access_token),
				"Content-Type": "multipart/form-data",
			},
		}
	);

	// Return user
	return user;
}
