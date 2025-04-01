import { axios } from "../../../config/axios";
import { AnswerOptionPrivate } from "../../answerOption/types/answerOptionTypes";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { QuestionPoints } from "../types/questionTypes";

export default async function updateQuestion(
	questionId: string,
	text: string,
	photo: File | undefined,
	order: number,
	points: QuestionPoints,
	answerOptions: AnswerOptionPrivate[],
	quizId: string
): Promise<void> {
	// Get session token
	const token = await getAuthToken();

	// Create form data
	const questionData = new FormData();
	questionData.append("text", text);
	if (photo != undefined) questionData.append("file", photo);
	questionData.append("order", order.toString());
	questionData.append("points", JSON.stringify(points));
	questionData.append("answerOptions", JSON.stringify(answerOptions));

	// Create quiz
	await axios.put(`/quizzes/${quizId}/questions/${questionId}`, questionData, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});
}
