import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import addIconToCategory from "../../category/utils/addIconToCategory";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { QuizPrivate } from "../types/quizTypes";

export default async function getQuizPrivate(id: string): Promise<QuizPrivate> {
	// Get session token
	const token = await getAuthToken();

	// Get quiz full
	const { data: quiz } = await axios.get<QuizPrivate>(`/quizzes/${id}/private`, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Add category icon to quiz category
	const category = addIconToCategory(quiz.category);

	// Return quiz
	return {
		...quiz,
		category,
	};
}
