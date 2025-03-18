import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import { Category } from "../../category/types/categoryTypes";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";

export default async function getUserCategories(userId: string): Promise<Category[]> {
	// Get session token
	const token = await getAuthToken();

	// Get data from DB
	const { data } = await axios.get<Category[]>(`/users/${userId}/categories`, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Return data
	return data;
}
