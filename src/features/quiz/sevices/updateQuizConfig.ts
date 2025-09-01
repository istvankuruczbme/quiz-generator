import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { QuizPrivate, EditQuizConfigData } from "../types/quizTypes";

export default async function updateQuizConfig(
	quizId: string,
	data: EditQuizConfigData
): Promise<QuizPrivate> {
	// Get auth token
	const token = await getAuthToken();

	// Send request
	const { data: quiz } = await axios.put<QuizPrivate>(`/quizzes/${quizId}/config`, data, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Return quiz
	return quiz;
}
