import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { Category, CategoryResponse } from "../types/categoryTypes";
import addIconToCategory from "../utils/addIconToCategory";

export default async function getCategories(): Promise<Category[]> {
	// Get session token
	const token = await getAuthToken();

	// Get data from DB
	const { data } = await axios.get<CategoryResponse[]>(`/categories`, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Add icon to categories
	const categories = data.map((cateory) => addIconToCategory(cateory));

	// Return categories
	return categories;
}
