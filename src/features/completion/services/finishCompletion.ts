import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
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
	const { data: completion } = await axios.put(
		`/quizzes/${quizId}/completions/${completionId}/finish`,
		null,
		{ headers: { Authorization: createBearerAuthHeader(token) } }
	);

	// Return completion
	return completion;
}
