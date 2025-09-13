import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import addIconToCategory from "../../category/utils/addIconToCategory";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { QuizPrivate } from "../types/quizTypes";

export default async function finishQuiz(id: string): Promise<QuizPrivate> {
	// Get auth token
	const token = await getAuthToken();

	// Send request
	const { data: quizRaw } = await axios.put<QuizPrivate>(`/quizzes/${id}/finish`, null, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Add icon to quiz category
	const category = addIconToCategory(quizRaw.category);
	const quiz = { ...quizRaw, category };

	// Return quiz
	return quiz;
}
