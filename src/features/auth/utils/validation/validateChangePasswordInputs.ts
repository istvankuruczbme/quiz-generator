import AppError from "../../../error/classes/AppError";
import getZodErrorMessages from "../../../error/utils/getZodErrorMessages";
import { ChangePasswordFormData } from "../../constants/formData";
import { ChangePasswordData, changePasswordSchema } from "./schemas/changePasswordSchema";

export default function validateChangePasswordInputs(
	changePasswordData: ChangePasswordFormData
): ChangePasswordData {
	// Validation
	const { success, data, error } = changePasswordSchema.safeParse(changePasswordData);

	// Check error
	if (!success) {
		throw new AppError({ message: "Validation failed.", details: getZodErrorMessages(error) });
	}

	// Return data
	return data;
}
