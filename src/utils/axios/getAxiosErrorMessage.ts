import { AxiosError } from "axios";

export default function getAxiosErrorMessage(error: AxiosError): string {
	// Get error response data
	const data = error.response?.data;

	// Validate data
	if (
		data == undefined ||
		typeof data !== "object" ||
		!("message" in data) ||
		typeof data.message !== "string"
	) {
		throw new Error("invalid-error");
	}

	// Return error message
	return data.message;
}
