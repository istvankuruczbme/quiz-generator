import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { CompletionQuestionPrivate } from "../types/completionQuestionTypes";

export default async function getCompletionQuestionPrivate(ids: {
	quizId: string;
	completionId: string;
	questionId: string;
}): Promise<CompletionQuestionPrivate> {
	// Get IDs
	const { quizId, completionId, questionId } = ids;

	// Get session token
	const token = await getAuthToken();

	// Send request
	const { data: completionQuestion } = await axios.get<CompletionQuestionPrivate>(
		`/quizzes/${quizId}/completions/${completionId}/questions/${questionId}`,
		{ headers: { Authorization: createBearerAuthHeader(token) } }
	);

	// Return completion question
	return completionQuestion;
}
