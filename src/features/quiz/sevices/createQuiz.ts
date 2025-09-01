import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";

export default async function createQuiz(quizData: {
	title: string;
	description: string;
	photo: File | null;
	categoryId: string;
}): Promise<{ id: string }> {
	// Get session token
	const token = await getAuthToken();

	// Get quiz data properties
	const { title, description, photo, categoryId } = quizData;

	// Create form data
	const quizFormData = new FormData();
	if (photo) quizFormData.append("file", photo);
	quizFormData.append("data", JSON.stringify({ title, description, categoryId }));

	// Create quiz
	const { data: quiz } = await axios.post<{ id: string }>("/quizzes", quizFormData, {
		headers: {
			Authorization: createBearerAuthHeader(token),
			"Content-Type": "multipart/form-data",
		},
	});

	// Return quiz
	return quiz;
}
