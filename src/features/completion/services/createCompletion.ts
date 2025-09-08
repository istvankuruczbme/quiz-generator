import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { CompletionPublic } from "../types/completionTypes";

export default async function createCompletion(data: {
	quizId: string;
}): Promise<CompletionPublic> {
	// Get quiz ID
	const { quizId } = data;

	// Get session token
	const token = await getAuthToken();

	// Send request
	const { data: completion } = await axios.post<CompletionPublic>(
		`/quizzes/${quizId}/completions`,
		null,
		{
			headers: { Authorization: createBearerAuthHeader(token) },
		}
	);

	// Return completion ID
	return completion;
}
