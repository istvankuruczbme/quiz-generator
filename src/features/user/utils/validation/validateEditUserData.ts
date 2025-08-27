import AppError from "../../../error/classes/AppError";
import getZodErrorMessages from "../../../error/utils/getZodErrorMessages";
import { EditUserData, editUserSchema } from "./schemas/editUserSchema";

export default function validateEditUserData(userData: EditUserData): EditUserData {
	// Validation
	const { success, data, error } = editUserSchema.safeParse(userData);

	// Check error
	if (!success) {
		throw new AppError({ message: "Validation failed.", details: getZodErrorMessages(error) });
	}

	// Return data
	return data;
}
