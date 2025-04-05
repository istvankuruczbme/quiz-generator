import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import { Category, CategoryResponse } from "../../category/types/categoryTypes";
import addIconToCategory from "../../category/utils/addIconToCategory";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";

export default async function getUserCategories(userId: string): Promise<Category[]> {
	// Get session token
	const token = await getAuthToken();

	// Get data from DB
	const { data } = await axios.get<CategoryResponse[]>(`/users/${userId}/categories`, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Add icon to categories
	const categories = data.map((cateory) => addIconToCategory(cateory));

	// Return categories
	return categories;
}
