import { axios } from "../../../config/axios";

export default async function createUserCategories(
	categoryIds: string[],
	userId: string
): Promise<void> {
	await axios.put<string[]>(`/users/${userId}/categories`, { categoryIds });
}
