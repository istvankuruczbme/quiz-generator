import AppError from "../../../error/classes/AppError";
import getZodErrorMessages from "../../../error/utils/getZodErrorMessages";
import { ChangeEmailFormData } from "../../constants/formData";
import { ChangeEmailData, changeEmailSchema } from "./schemas/changeEmailSchema";

export default function validateChangeEmailInputs(
	changeEmailData: ChangeEmailFormData
): ChangeEmailData {
	// Validation
	const { success, data, error } = changeEmailSchema.safeParse(changeEmailData);

	// Check error
	if (!success) {
		throw new AppError({ message: "Validation failed.", details: getZodErrorMessages(error) });
	}

	// Return data
	return data;
}
