import AppError from "../../../error/classes/AppError";
import getZodErrorMessages from "../../../error/utils/getZodErrorMessages";
import {
	NewCompletionQuestionData,
	newCompletionQuestionSchema,
} from "./schemas/newCompletionQuestionSchema";

export default function validateNewCompletionQuestionData(
	completionQuestionData: unknown
): NewCompletionQuestionData {
	// Validation
	const { success, data, error } = newCompletionQuestionSchema.safeParse(completionQuestionData);

	// Check error
	if (!success) {
		throw new AppError({ message: "Validation failed.", details: getZodErrorMessages(error) });
	}

	// Return data
	return data;
}
