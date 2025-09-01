import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { NewQuestionData, QuestionPrivate } from "../types/questionTypes";

export default async function createQuestion(
	quizId: string,
	data: NewQuestionData
): Promise<QuestionPrivate> {
	// Get session token
	const token = await getAuthToken();

	// Get photo
	const { photo, ...restData } = data;

	// Create form data
	const questionFormData = new FormData();
	if (photo) questionFormData.append("file", photo);
	questionFormData.append("data", JSON.stringify(restData));

	// Send request
	const { data: question } = await axios.post<QuestionPrivate>(
		`/quizzes/${quizId}/questions/`,
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
