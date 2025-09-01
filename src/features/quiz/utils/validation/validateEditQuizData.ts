import AppError from "../../../error/classes/AppError";
import getZodErrorMessages from "../../../error/utils/getZodErrorMessages";
import { EditQuizDataFormData } from "../../constants/formData";
import { EditQuizData, editQuizDataSchema } from "./schemas/editQuizDataSchema";

export default function validateEditQuizData(quizData: EditQuizDataFormData): EditQuizData {
	// Validation
	const { success, data, error } = editQuizDataSchema.safeParse(quizData);

	// Check error
	if (!success) {
		throw new AppError({ message: "Validation failed.", details: getZodErrorMessages(error) });
	}

	// Return data
	return data;
}
