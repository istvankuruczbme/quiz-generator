import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";

export default async function removeQuizPhoto(quizId: string): Promise<void> {
	// Get auth token
	const token = await getAuthToken();

	// Remove quiz photo
	await axios.delete(`/quizzes/${quizId}/photo`, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});
}
