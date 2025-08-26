import AppError from "../../../error/classes/AppError";
import getZodErrorMessages from "../../../error/utils/getZodErrorMessages";
import { PasswordResetEmailFormData } from "../../constants/formData";
import {
	PasswordResetEmailData,
	passwordResetEmailSchema,
} from "./schemas/passwordResetEmailSchema";

export default function validatePasswordResetEmailInputs(
	changeEmailData: PasswordResetEmailFormData
): PasswordResetEmailData {
	// Validation
	const { success, data, error } = passwordResetEmailSchema.safeParse(changeEmailData);

	// Check error
	if (!success) {
		throw new AppError({ message: "Validation failed.", details: getZodErrorMessages(error) });
	}

	// Return data
	return data;
}
