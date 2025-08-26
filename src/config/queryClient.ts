import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Function to handle query retry action
function queryRetryCallback(failureCount: number, error: Error | null) {
	// Server error
	if (
		error instanceof AxiosError &&
		(error.status === 400 || // bad request
			error.status === 404) // resource not found
	) {
		return false;
	}
	return failureCount < 3;
}

// Query client instance
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5 min
			retry: queryRetryCallback,
		},
	},
});

export default queryClient;
