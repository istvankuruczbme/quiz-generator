import { axios } from "../../../config/axios";
import { Product } from "../types/productTypes";

export default async function getProducts(userId: string): Promise<Product[]> {
	const { data } = await axios.get<Product[]>(`/products?userId=${userId}`);
	return data;
}
