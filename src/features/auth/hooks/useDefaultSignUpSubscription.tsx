import { Dispatch, SetStateAction, useEffect } from "react";
import { Subscription } from "../../subscription/types/subscriptionTypes";

const useDefaultSignUpSubscription = (
	subscriptions: Subscription[],
	setSubscriptionId: Dispatch<SetStateAction<string>>
) => {
	useEffect(() => {
		// Check if there is a subscription
		if (subscriptions.length === 0) return;

		// Find the free one
		const freeSubscription = subscriptions.find(
			(subscription) =>
				subscription.default_price.unit_amount != null &&
				subscription.default_price.unit_amount === 0
		);

		// Check if subscription exists
		if (freeSubscription == undefined) return;

		// Update default subscription ID
		setSubscriptionId(freeSubscription.id);
	}, [subscriptions, setSubscriptionId]);
};

export default useDefaultSignUpSubscription;
