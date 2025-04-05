import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";

export default async function removeQuestionPhoto(
	questionId: string,
	quizId: string
): Promise<void> {
	// Get auth token
	const token = await getAuthToken();

	// Remove photo
	await axios.delete(`/quizzes/${quizId}/questions/${questionId}/photo`, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});
}
