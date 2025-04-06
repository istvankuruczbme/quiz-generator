import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";

export default async function finishQuiz(quizId: string): Promise<void> {
	// Get auth token
	const token = await getAuthToken();

	// Finish quiz
	axios.put(`/quizzes/${quizId}/finish`, null, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});
}
