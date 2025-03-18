import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { Product } from "../types/productTypes";

export default async function getProducts(): Promise<Product[]> {
	// Get session token
	const token = await getAuthToken();

	// Get data from DB
	const { data } = await axios.get<Product[]>(`/products`, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Return data
	return data;
}
