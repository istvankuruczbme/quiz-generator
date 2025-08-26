import AppError from "../../../error/classes/AppError";
import getZodErrorMessages from "../../../error/utils/getZodErrorMessages";
import { PasswordResetFormData } from "../../constants/formData";
import { PasswordResetData, passwordResetSchema } from "./schemas/passwordResetSchema";

export default function validatePasswordResetInputs(
	passwordResetData: PasswordResetFormData
): PasswordResetData {
	// Validation
	const { success, data, error } = passwordResetSchema.safeParse(passwordResetData);

	// Check error
	if (!success) {
		throw new AppError({ message: "Validation failed.", details: getZodErrorMessages(error) });
	}

	// Return data
	return data;
}
