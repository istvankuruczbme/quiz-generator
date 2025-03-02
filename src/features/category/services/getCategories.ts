import { axios } from "../../../config/axios";
import { Category } from "../types/categoryTypes";

export default async function getCategories(userId: string): Promise<Category[]> {
	const { data } = await axios.get<Category[]>(`/categories?userId=${userId}`);
	return data;
}
