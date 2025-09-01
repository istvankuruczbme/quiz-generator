import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { QuizPrivate } from "../types/quizTypes";
import { EditQuizData } from "../utils/validation/schemas/editQuizDataSchema";

export default async function updateQuizData(id: string, data: EditQuizData): Promise<QuizPrivate> {
	// Get auth token
	const token = await getAuthToken();

	// Get data properties
	const { title, description, photoUrl, photo, categoryId } = data;

	// Create form data
	const quizFormData = new FormData();
	if (photo) quizFormData.append("file", photo);
	quizFormData.append("data", JSON.stringify({ title, description, photoUrl, categoryId }));

	// Update quiz data
	const { data: quiz } = await axios.put<QuizPrivate>(`/quizzes/${id}`, quizFormData, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Return quiz
	return quiz;
}
