import { useEffect, useState } from "react";
import getSubscriptions from "../services/getSubscriptions";
import { Subscription } from "../types/subscriptionTypes";
import useUser from "../../../contexts/UserContext/useUser";

const useSubscriptions = () => {
	// #region States
	const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
	const [loading, setLoading] = useState(true);
	// #endregion

	// #region Hooks
	const { user } = useUser();
	//#endregion

	useEffect(() => {
		// Check user
		if (user == null) {
			setSubscriptions([]);
			return;
		}

		// Fetch subscriptions
		(async function fetchSubscriptions() {
			setLoading(true);

			try {
				const subscriptions = await getSubscriptions(user.id);
				setSubscriptions(subscriptions);

				setLoading(false);
			} catch (err) {
				console.log("Error fetching the subscriptions.", err);
				setLoading(false);
			}
		})();
	}, [user]);

	return { subscriptions, loading };
};

export default useSubscriptions;
