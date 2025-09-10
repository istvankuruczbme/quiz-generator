import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import addIconToCategory from "../../category/utils/addIconToCategory";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { CompletionPrivate } from "../types/completionTypes";

export default async function getCompletionPrivate(ids: {
	quizId: string;
	completionId: string;
}): Promise<CompletionPrivate> {
	// Get IDs
	const { quizId, completionId } = ids;

	// Get session token
	const token = await getAuthToken();

	// Send request
	const { data: completion } = await axios.get<CompletionPrivate>(
		`/quizzes/${quizId}/completions/${completionId}/private`,
		{
			headers: { Authorization: createBearerAuthHeader(token) },
		}
	);

	// Add category icon to quiz category
	const category = addIconToCategory(completion.quiz.category);

	// Return completion
	return { ...completion, quiz: { ...completion.quiz, category } };
}
