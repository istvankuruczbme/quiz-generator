import { useCallback, useEffect, useState } from "react";
import { Product } from "../../product/types/productTypes";
import Stripe from "stripe";

const useDefaultProduct = (products: Product[], subscription: Stripe.Subscription | null) => {
	// #region States
	const [productId, setProductId] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	// #endregion

	// #region Functions
	const setDefaultProductId = useCallback(() => {
		setProductId(null);
		setLoading(false);
	}, []);
	//#endregion

	useEffect(() => {
		// Check if there is a product
		if (products.length === 0) return;

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
