import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";

export default async function deleteQuestion(quizId: string, questionId: string): Promise<void> {
	// Get session token
	const token = await getAuthToken();

	// Delete question
	await axios.delete(`/quizzes/${quizId}/questions/${questionId}`, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});
}
