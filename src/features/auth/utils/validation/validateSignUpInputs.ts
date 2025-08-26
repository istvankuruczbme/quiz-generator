import AppError from "../../../error/classes/AppError";
import getZodErrorMessages from "../../../error/utils/getZodErrorMessages";
import { SignUpFormData } from "../../constants/formData";
import { SignUpData, signUpSchema } from "./schemas/signUpSchema";

export default function validateSignUpInputs(signUpData: SignUpFormData): SignUpData {
	// Validation
	const { success, data, error } = signUpSchema.safeParse(signUpData);

	// Check error
	if (!success) {
		throw new AppError({ message: "Validation failed.", details: getZodErrorMessages(error) });
	}

	// Return data
	return data;
}
