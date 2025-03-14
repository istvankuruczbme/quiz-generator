import { useEffect, useState } from "react";
import Stripe from "stripe";
import useUser from "../../../contexts/UserContext/useUser";
import getUserSubscription from "../services/getUserSubscription";

const useUserSubscription = () => {
	// #region States
	const [subscription, setSubscription] = useState<Stripe.Subscription | null>(null);
	const [loading, setLoading] = useState(false);
	// #endregion

	// #region Hooks
	const { user } = useUser();
	// #endregion

	useEffect(() => {
		if (user == null || user.subscriptionId == null) {
			setSubscription(null);
			return;
		}

		(async function fetchUserSubscription() {
			setLoading(true);

			try {
				// Get subscription
				const subscription = await getUserSubscription(user.id);

				// Update subscription state
				setSubscription(subscription);
				setLoading(false);
			} catch (err) {
				console.log("Error fetching the subscription of user.", err);
				setLoading(false);
			}
		})();
	}, [user]);

	return { subscription, loading };
};

export default useUserSubscription;
