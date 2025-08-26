import AppError from "../../../error/classes/AppError";
import getZodErrorMessages from "../../../error/utils/getZodErrorMessages";
import { SignInFormData } from "../../constants/formData";
import { SignInData, signInSchema } from "./schemas/signInSchema";

export default function validateSignInInputs(signInData: SignInFormData): SignInData {
	// Validation
	const { success, data, error } = signInSchema.safeParse(signInData);

	// Check error
	if (!success) {
		throw new AppError({ message: "Validation failed.", details: getZodErrorMessages(error) });
	}

	// Return data
	return data;
}
