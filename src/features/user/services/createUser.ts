import { axios } from "../../../config/axios";
import checkAxiosError from "../../../utils/axios/checkAxiosError";
import getAxiosErrorMessage from "../../../utils/axios/getAxiosErrorMessage";
import { UserProfile } from "../types/userTypes";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";

export default async function createUser(token: string): Promise<UserProfile | null> {
	try {
		const { data } = await axios.post<UserProfile>("/users", null, {
			headers: {
				Authorization: createBearerAuthHeader(token),
			},
		});
		return data;
	} catch (err) {
		if (
			checkAxiosError(err) &&
			getAxiosErrorMessage(err) === 'duplicate key value violates unique constraint "user_pkey"'
		) {
			return null;
		}

		throw err;
	}
}
