import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { QuizSummary } from "../types/quizTypes";

export default async function getUserQuizzes(): Promise<QuizSummary[]> {
	// Get auth token
	const token = await getAuthToken();

	// Get user quizzes
	const { data } = await axios.get<QuizSummary[]>("/quizzes/my-quizzes", {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Return quizzes
	return data;
}
