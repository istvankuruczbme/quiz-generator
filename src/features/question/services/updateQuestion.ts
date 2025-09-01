import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { EditQuestionData, QuestionPrivate } from "../types/questionTypes";

export default async function updateQuestion(
	ids: { questionId: string; quizId: string },
	data: EditQuestionData
): Promise<QuestionPrivate> {
	// Get session token
	const token = await getAuthToken();

	// Get IDs
	const { quizId, questionId } = ids;

	// Get photo
	const { photo, ...restData } = data;

	// Create form data
	const questionFormData = new FormData();
	if (photo) questionFormData.append("file", photo);
	questionFormData.append("data", JSON.stringify(restData));

	// Send request
	const { data: question } = await axios.put<QuestionPrivate>(
		`/quizzes/${quizId}/questions/${questionId}`,
		questionFormData,
		{
			headers: {
				Authorization: createBearerAuthHeader(token),
			},
		}
	);

	// Return question
	return question;
}
