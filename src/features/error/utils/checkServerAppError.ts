import { AppError } from "../types/errorTypes";

export default function checkServerAppError(error: unknown): error is AppError {
	// Response is not an object
	if (!error || typeof error !== "object") return false;

	// Check app error properties
	if (!("message" in error) || typeof error.message !== "string") return false;

	return true;
}
