import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import { QuizPrivate } from "../../quiz/types/quizTypes";
import { EditQuizQuestionGenerationData } from "../../quiz/utils/validation/schemas/editQuizQuestionGenerationSchema";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";

export default async function generateQuestions(
	quizId: string,
	data: EditQuizQuestionGenerationData
): Promise<QuizPrivate> {
	// Get auth token
	const token = await getAuthToken();

	// Get data properties
	const { file, ...restData } = data;

	// Create form data
	const questionsGenerationFormData = new FormData();
	questionsGenerationFormData.append("file", file);
	questionsGenerationFormData.append("data", JSON.stringify(restData));

	// Generate questions
	const { data: questions } = await axios.post<QuizPrivate>(
		`/quizzes/${quizId}/questions/generate`,
		questionsGenerationFormData,
		{
			headers: {
				Authorization: createBearerAuthHeader(token),
			},
		}
	);

	// Return questions
	return questions;
}
