import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { Category } from "../types/categoryTypes";

export default async function getCategories(): Promise<Category[]> {
	// Get session token
	const token = await getAuthToken();

	// Get data from DB
	const { data } = await axios.get<Category[]>(`/categories`, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Return data
	return data;
}
