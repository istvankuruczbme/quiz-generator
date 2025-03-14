import { ChangeEvent, FC, FormEvent, Fragment, HTMLAttributes } from "react";
// Hooks
import useUser from "../../../../contexts/UserContext/useUser";
import useSubscriptions from "../../hooks/useSubscriptions";
import useDefaultSubscription from "../../../auth/hooks/useDefaultSubscription";
import { useNavigate, useSearchParams } from "react-router-dom";
// Functions
import createSubscriptionCheckoutSession from "../../services/createSubscriptionCheckoutSession";
import updateSubscription from "../../services/updateSubscription";
// CSS
import "./ChangeSubscription.css";

type ChangeSubscriptionProps = HTMLAttributes<HTMLDivElement>;

const ChangeSubscription: FC<ChangeSubscriptionProps> = () => {
	// #region Hooks
	const { user } = useUser();
	const { subscriptions } = useSubscriptions();
	const { subscriptionId, setSubscriptionId } = useDefaultSubscription();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
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
		const priceId = subscription.default_price.id;

		// Create subscription
		if (user.subscriptionId == null) {
			try {
				// Create checkout session
				const { url } = await createSubscriptionCheckoutSession(
					user.customerId,
					priceId,
					"/profile/categories"
				);

				// Navigate to checkout portal
				window.location.href = url;
			} catch (err) {
				console.log("Error creating the checkout session.", err);
			}
		}
		// Update subscription
		else {
			try {
				// Update subscription
				await updateSubscription(user.id, priceId);

				// Navigate to Profile page
				navigate("/profile");
			} catch (err) {
				console.log("Error updating the subscription.", err);
			}
		}
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
