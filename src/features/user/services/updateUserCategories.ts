import { axios } from "../../../config/axios";

export default async function updateUserCategories(
	categoryIds: string[],
	userId: string
): Promise<void> {
	await axios.put<string[]>(`/users/${userId}/categories`, { categoryIds });
}
