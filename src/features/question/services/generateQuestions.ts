import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { QuestionGenerationStrategy } from "../types/questionTypes";

export default async function generateQuestions(
	quizId: string,
	file: File,
	strategy: QuestionGenerationStrategy,
	questionCount: number,
	answerOptionCount: number
): Promise<void> {
	// Get auth token
	const token = await getAuthToken();

	// Create form data
	const questionsGenerationData = new FormData();
	questionsGenerationData.append("file", file);
	questionsGenerationData.append(
		"data",
		JSON.stringify({ strategy, questionCount, answerOptionCount })
	);

	// Generate questions
	await axios.post(`/quizzes/${quizId}/questions/generate`, questionsGenerationData, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});
}
