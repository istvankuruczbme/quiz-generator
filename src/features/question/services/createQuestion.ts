import { axios } from "../../../config/axios";
import { AnswerOptionPrivate } from "../../answerOption/types/answerOptionTypes";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";

export default async function createQuestion(
	text: string,
	photo: File | undefined,
	order: number,
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
	questionData.append("answerOptions", JSON.stringify(answerOptions));

	// Create quiz
	await axios.post(`/quizzes/${quizId}/quesitons/`, questionData, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});
}
