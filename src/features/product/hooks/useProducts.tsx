import { useEffect, useState } from "react";
import getProducts from "../services/getProducts";
import useUser from "../../../contexts/UserContext/useUser";
import { Product } from "../types/productTypes";

const useProducts = () => {
	// #region States
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	// #endregion

	// #region Hooks
	const { user } = useUser();
	//#endregion

	useEffect(() => {
		// Check user
		if (user == null) {
			setProducts([]);
			return;
		}

		// Fetch products
		(async function fetchproducts() {
			setLoading(true);

			try {
				// Get products
				const products = await getProducts();

				// Update products state
				setProducts(products);
			} catch (err) {
				console.log("Error fetching the products.", err);
			} finally {
				setLoading(false);
			}
		})();
	}, [user]);

	return { products, loading };
};

export default useProducts;
