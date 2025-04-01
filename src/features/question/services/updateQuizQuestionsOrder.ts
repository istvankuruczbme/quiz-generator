import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";

export default async function updateQuizQuestionsOrder(
	quizId: string,
	questionIds: string[]
): Promise<void> {
	// Get session token
	const token = await getAuthToken();

	// Update questions order
	await axios.put(
		`/quizzes/${quizId}/questions`,
		{ questionIds },
		{
			headers: {
				Authorization: createBearerAuthHeader(token),
			},
		}
	);
}
