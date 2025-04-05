import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";

export default async function deleteQuiz(id: string): Promise<void> {
	// Get auth token
	const token = await getAuthToken();

	// Delete quiz
	await axios.delete(`/quizzes/${id}`, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});
}
