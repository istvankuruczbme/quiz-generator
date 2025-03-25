import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { QuizSummary } from "../types/quizTypes";

export default async function getQuizSummary(quizId: string): Promise<QuizSummary> {
	// Get session token
	const token = await getAuthToken();

	// Get quiz summary
	const { data } = await axios.get<QuizSummary>(`/quizzes/${quizId}?type=summary`, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Return quiz summary
	return data;
}
