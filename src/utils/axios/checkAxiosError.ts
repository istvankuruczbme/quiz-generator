import axios, { AxiosError } from "axios";

export default function checkAxiosError(error: unknown): error is AxiosError {
	return axios.isAxiosError(error);
}
