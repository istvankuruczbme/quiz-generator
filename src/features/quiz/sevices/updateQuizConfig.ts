import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { QuestionOrder } from "../assets/questionOrder";
import { QuizVisibility } from "../assets/quizVisibility";

export default async function updateQuizConfig(
	quizId: string,
	visibility: QuizVisibility,
	questionOrder: QuestionOrder
): Promise<void> {
	// Get auth token
	const token = await getAuthToken();

	// Update quiz config
	await axios.put(
		`/quizzes/${quizId}/config`,
		{
			visibility,
			questionOrder,
		},
		{
			headers: {
				Authorization: createBearerAuthHeader(token),
			},
		}
	);
}
