import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { CompletionPublic } from "../types/completionTypes";

export default async function getCompletionPublic(ids: {
	quizId: string;
	completionId: string;
}): Promise<CompletionPublic> {
	// Get IDs
	const { quizId, completionId } = ids;

	// Get session token
	const token = await getAuthToken();

	// Send request
	const { data: completion } = await axios.get(`/quizzes/${quizId}/completions/${completionId}`, {
		headers: { Authorization: createBearerAuthHeader(token) },
	});

	// Return completion
	return completion;
}
