import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import addIconToCategory from "../../category/utils/addIconToCategory";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { CompletionPublic } from "../types/completionTypes";

export default async function finishCompletion(ids: {
	quizId: string;
	completionId: string;
}): Promise<CompletionPublic> {
	// Get IDs
	const { quizId, completionId } = ids;

	// Get session token
	const token = await getAuthToken();

	// Send request
	const { data: completionRaw } = await axios.put<CompletionPublic>(
		`/quizzes/${quizId}/completions/${completionId}/finish`,
		null,
		{ headers: { Authorization: createBearerAuthHeader(token) } }
	);

	// Add icon to quiz category
	const category = addIconToCategory(completionRaw.quiz.category);
	const completion = {
		...completionRaw,
		quiz: {
			...completionRaw.quiz,
			category,
		},
	};

	// Return completion
	return completion;
}
