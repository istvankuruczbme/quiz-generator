import { axios } from "../../../config/axios";
import { Category } from "../../category/types/categoryTypes";

export default async function getUserCategories(userId: string): Promise<Category[]> {
	const { data } = await axios.get<Category[]>(`/users/${userId}/categories`);
	return data;
}
