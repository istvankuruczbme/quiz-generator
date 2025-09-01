import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { QuizPrivate } from "../types/quizTypes";

export default async function finishQuiz(id: string): Promise<QuizPrivate> {
	// Get auth token
	const token = await getAuthToken();

	// Send request
	const { data: quiz } = await axios.put<QuizPrivate>(`/quizzes/${id}/finish`, null, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Return quiz
	return quiz;
}
