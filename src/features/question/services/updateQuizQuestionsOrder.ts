import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import { QuizPrivate } from "../../quiz/types/quizTypes";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";

export default async function updateQuizQuestionsOrder(
	quizId: string,
	data: { questionIds: string[] }
): Promise<QuizPrivate> {
	// Get session token
	const token = await getAuthToken();

	// Send request
	const { data: quiz } = await axios.put<QuizPrivate>(`/quizzes/${quizId}/questions`, data, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Return quiz
	return quiz;
}
