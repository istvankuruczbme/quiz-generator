import AppError from "../../../error/classes/AppError";
import getZodErrorMessages from "../../../error/utils/getZodErrorMessages";
import { EditQuizQuestionGenerationTransformedData } from "../../../question/types/questionTypes";
import {
	EditQuizQuestionGenerationData,
	editQuizQuestionGenerationSchema,
} from "./schemas/editQuizQuestionGenerationSchema";

export default function validateEditQuizQuestionGenerationData(
	questionGenerationData: EditQuizQuestionGenerationTransformedData,
	params: {
		maxQuestionCount: number;
		maxAnswerOptionCount: number;
	}
): EditQuizQuestionGenerationData {
	// Validation
	const { success, data, error } =
		editQuizQuestionGenerationSchema(params).safeParse(questionGenerationData);

	// Check error
	if (!success) {
		throw new AppError({ message: "Validation failed.", details: getZodErrorMessages(error) });
	}

	// Return data
	return data;
}
