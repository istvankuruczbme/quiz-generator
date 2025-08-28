import { axios } from "../../../config/axios";
import getSession from "../../auth/services/getSession";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";

export default async function deleteUser(): Promise<void> {
	// Get session
	const session = await getSession();

	// Delete user from DB
	await axios.delete(`/users/${session.user.id}`, {
		headers: {
			Authorization: createBearerAuthHeader(session.access_token),
		},
	});
}
