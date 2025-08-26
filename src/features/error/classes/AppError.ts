import { AppError as AppErrorType } from "../types/errorTypes";

class AppError extends Error {
	// Properties
	details?: string;

	constructor(error: AppErrorType) {
		// Error properties
		const { message, details } = error;

		// Construct error
		super(message);
		this.details = details;

		// Fixing prototype chain
		Object.setPrototypeOf(this, new.target.prototype);
		Error.captureStackTrace(this);
	}
}

export default AppError;
