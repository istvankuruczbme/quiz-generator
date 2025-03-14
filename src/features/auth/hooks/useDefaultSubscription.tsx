import { useCallback, useEffect, useState } from "react";
import useSubscriptions from "../../subscription/hooks/useSubscriptions";
import useUserSubscription from "../../user/hooks/useUserSubscription";

const useDefaultSubscription = () => {
	// #region States
	const [subscriptionId, setSubscriptionId] = useState("");
	const [loading, setLoading] = useState(true);
	// #endregion

	// #region Hooks
	const { subscription } = useUserSubscription();
	const { subscriptions } = useSubscriptions();
	// #endregion

	// #region Functions
	const setDefaultSubscriptionId = useCallback(() => {
		// Find the free product
		const freeSubscription = subscriptions.find(
			(subscription) =>
				subscription.default_price.unit_amount != null &&
				subscription.default_price.unit_amount === 0
		)!;

		// Check if subscription exists
		if (freeSubscription == undefined) return;

		// Update default subscription ID
		setSubscriptionId(freeSubscription.id);
		setLoading(false);
	}, [subscriptions]);
	//#endregion

	useEffect(() => {
		// Check if there is a subscription
		if (subscriptions.length === 0) {
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
				setDefaultSubscriptionId();
				return;
			}

			// Update default subscription ID
			setSubscriptionId(productId);
			setLoading(false);
		} else setDefaultSubscriptionId();
	}, [subscriptions, subscription, setSubscriptionId, setDefaultSubscriptionId]);

	return { subscriptionId, setSubscriptionId, loading };
};

export default useDefaultSubscription;
