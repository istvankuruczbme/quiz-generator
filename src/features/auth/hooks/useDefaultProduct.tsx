import { useCallback, useEffect, useState } from "react";
import useProducts from "../../product/hooks/useProducts";
import useUserSubscription from "../../user/hooks/useUserSubscription";

const useDefaultProduct = () => {
	// #region States
	const [productId, setProductId] = useState("");
	const [loading, setLoading] = useState(true);
	// #endregion

	// #region Hooks
	const { subscription } = useUserSubscription();
	const { products } = useProducts();
	// #endregion

	// #region Functions
	const setDefaultProductId = useCallback(() => {
		// Find the free product
		const freeProduct = products.find(
			(product) =>
				product.default_price.unit_amount != null && product.default_price.unit_amount === 0
		)!;

		// Check if product exists
		if (freeProduct == undefined) return;

		// Update default product ID
		setProductId(freeProduct.id);
		setLoading(false);
	}, [products]);
	//#endregion

	useEffect(() => {
		// Check if there is a product
		if (products.length === 0) {
			setLoading(false);
			return;
		}

		setLoading(true);

		// If the user has a subscription
		if (subscription != null) {
			// Get product ID of subscription
			const productId = subscription.items.data[0].plan.product;

			// Check product ID
			if (typeof productId !== "string") {
				setDefaultProductId();
				return;
			}

			// Update default product ID
			setProductId(productId);
			setLoading(false);
		} else setDefaultProductId();
	}, [products, subscription, setProductId, setDefaultProductId]);

	return { productId, setProductId, loading };
};

export default useDefaultProduct;
