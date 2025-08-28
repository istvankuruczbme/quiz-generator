import { axios } from "../../../config/axios";
import getSession from "../../auth/services/getSession";
import { Category, CategoryResponse } from "../../category/types/categoryTypes";
import addIconToCategory from "../../category/utils/addIconToCategory";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";

export default async function getUserCategories(): Promise<Category[]> {
	// Get session
	const session = await getSession();

	// Get data from DB
	const { data: rawCategories } = await axios.get<CategoryResponse[]>(
		`/users/${session.user.id}/categories`,
		{
			headers: {
				Authorization: createBearerAuthHeader(session.access_token),
			},
		}
	);

	// Add icon to categories
	const categories = rawCategories.map((cateory) => addIconToCategory(cateory));

	// Return categories
	return categories;
}
