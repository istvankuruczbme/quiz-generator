import { axios } from "../../../config/axios";
import getSession from "../../auth/services/getSession";
import { UserProfile } from "../types/userTypes";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";

export default async function getUser(): Promise<UserProfile> {
	// Get session
	const session = await getSession();

	// Send request
	const { data: user } = await axios.get<UserProfile>(`/users/${session.user.id}`, {
		headers: {
			Authorization: createBearerAuthHeader(session.access_token),
		},
	});

	// Return user
	return user;
}
