import AppError from "../../../error/classes/AppError";
import getZodErrorMessages from "../../../error/utils/getZodErrorMessages";
import { QuestionData, questionSchema } from "./schemas/questionSchema";

export default function validateQuestionData(questionData: QuestionData): QuestionData {
	// Validation
	const { success, data, error } = questionSchema.safeParse(questionData);

	// Check error
	if (!success) {
		throw new AppError({ message: "Validation failed.", details: getZodErrorMessages(error) });
	}

	// Return data
	return data;
}
