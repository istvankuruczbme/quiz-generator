import AppError from "../../../error/classes/AppError";
import getZodErrorMessages from "../../../error/utils/getZodErrorMessages";
import { NewQuizFormData } from "../../constants/formData";
import { NewQuizData, newQuizSchema } from "./schemas/newQuizSchema";

export default function validateNewQuizData(quizData: NewQuizFormData): NewQuizData {
	// Validation
	const { success, data, error } = newQuizSchema.safeParse(quizData);

	// Check error
	if (!success) {
		throw new AppError({ message: "Validation failed.", details: getZodErrorMessages(error) });
	}

	// Return data
	return data;
}
