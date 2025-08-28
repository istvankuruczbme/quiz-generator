import { axios } from "../../../config/axios";
import getSession from "../../auth/services/getSession";
import { Category } from "../../category/types/categoryTypes";
import addIconToCategory from "../../category/utils/addIconToCategory";
import createBearerAuthHeader from "../utils/createBearerAuthHeader";

export default async function updateUserCategories(userCategoriesData: {
	categoryIds: string[];
}): Promise<Category[]> {
	// Get session
	const session = await getSession();

	// Send request
	const { data: rawCategories } = await axios.put<Category[]>(
		`/users/${session.user.id}/categories`,
		userCategoriesData,
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
