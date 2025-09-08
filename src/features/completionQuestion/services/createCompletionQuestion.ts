import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { CompletionQuestionPublic } from "../types/completionQuestionTypes";

export default async function createCompletionQuestion(
	ids: { quizId: string; completionId: string },
	data: { selectedAnswerOptions: string[]; questionId: string }
): Promise<CompletionQuestionPublic> {
	// Get IDs
	const { quizId, completionId } = ids;

	// Get session token
	const token = await getAuthToken();

	// Send request
	const { data: completionQuestion } = await axios.post<CompletionQuestionPublic>(
		`/quizzes/${quizId}/completions/${completionId}/questions`,
		data,
		{
			headers: { Authorization: createBearerAuthHeader(token) },
		}
	);

	// Return completion question
	return completionQuestion;
}
