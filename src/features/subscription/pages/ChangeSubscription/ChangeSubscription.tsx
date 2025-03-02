import { ChangeEvent, FC, FormEvent, Fragment, HTMLAttributes, useState } from "react";
// Hooks
import useUser from "../../../../contexts/UserContext/useUser";
import useSubscriptions from "../../hooks/useSubscriptions";
import useDefaultSignUpSubscription from "../../../auth/hooks/useDefaultSignUpSubscription";
// Functions
import createSubscriptionCheckoutSession from "../../services/createSubscriptionCheckoutSession";
// CSS
import "./ChangeSubscription.css";
import { useSearchParams } from "react-router-dom";

type ChangeSubscriptionProps = HTMLAttributes<HTMLDivElement>;

const ChangeSubscription: FC<ChangeSubscriptionProps> = () => {
	// #region States
	const [subscriptionId, setSubscriptionId] = useState("");
	// #endregion

	// #region Hooks
	const { user } = useUser();
	const { subscriptions } = useSubscriptions();
	useDefaultSignUpSubscription(subscriptions, setSubscriptionId);
	const [searchParams] = useSearchParams();
	//#endregion

	// #region Variables
	const success = searchParams.get("success") === "";
	const cancel = searchParams.get("cancel") === "";
	// #endregion

	// #region Functions
	function handleSubscriptionChange(e: ChangeEvent<HTMLInputElement>, id: string) {
		if (e.target.checked) setSubscriptionId(id);
	}

	async function handleSubscriptionSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Check user
		if (user == null) return;

		// Find subscription
		const subscription = subscriptions.find(
			(subscription) => subscription.id === subscriptionId
		)!;

		// Create checkout session
		const { url } = await createSubscriptionCheckoutSession(
			user.customerId,
			subscription.default_price.id,
			"/profile/categories"
		);

		// Navigate to checkout portal
		window.location.href = url;
	}
	//#endregion

	return (
		<div>
			<h1>Change Subscription</h1>

			{user?.subscriptionId == null && (
				<p>Your profile is not complete. Choose a subscription to continue.</p>
			)}
			{cancel && <p>Payment cancelled.</p>}
			{success && <p>Payment was successful.</p>}

			<form onSubmit={handleSubscriptionSubmit}>
				{subscriptions.map((subscription) => (
					<Fragment key={subscription.id}>
						<input
							type="radio"
							name="signUpSubscription"
							id={subscription.id}
							checked={subscriptionId === subscription.id}
							onChange={(e) => handleSubscriptionChange(e, subscription.id)}
						/>
						<label htmlFor={subscription.id}>{subscription.name}</label>
						<br />
					</Fragment>
				))}

				<button type="submit">Subscribe</button>
			</form>
		</div>
	);
};

export default ChangeSubscription;
