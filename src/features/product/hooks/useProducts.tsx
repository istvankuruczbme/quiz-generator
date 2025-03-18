import { useEffect, useState } from "react";
import getProducts from "../services/getProducts";
import useUser from "../../../contexts/UserContext/useUser";
import { Product } from "../types/productTypes";

const useProducts = () => {
	// #region States
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
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
				const products = await getProducts();
				setProducts(products);

				setLoading(false);
			} catch (err) {
				console.log("Error fetching the products.", err);
				setLoading(false);
			}
		})();
	}, [user]);

	return { products, loading };
};

export default useProducts;
