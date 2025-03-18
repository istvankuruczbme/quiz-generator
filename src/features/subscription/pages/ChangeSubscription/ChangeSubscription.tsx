import { ChangeEvent, FC, FormEvent, Fragment, HTMLAttributes } from "react";
// Hooks
import useUser from "../../../../contexts/UserContext/useUser";
import useProducts from "../../../product/hooks/useProducts";
import useDefaultProduct from "../../../auth/hooks/useDefaultProduct";
import { useNavigate, useSearchParams } from "react-router-dom";
// Functions
import createCheckoutSession from "../../../product/services/createCheckoutSession";
import updateSubscription from "../../services/updateSubscription";
// CSS
import "./ChangeSubscription.css";
import useUserSubscription from "../../../user/hooks/useUserSubscription";

type ChangeSubscriptionProps = HTMLAttributes<HTMLDivElement>;

const ChangeSubscription: FC<ChangeSubscriptionProps> = () => {
	// #region Hooks
	const { user } = useUser();
	const { subscription } = useUserSubscription();
	const { products } = useProducts();
	const { productId, setProductId } = useDefaultProduct();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	//#endregion

	// #region Variables
	const success = searchParams.get("success") === "";
	const cancel = searchParams.get("cancel") === "";
	// #endregion

	// #region Functions
	function handleProductChange(e: ChangeEvent<HTMLInputElement>, id: string) {
		if (e.target.checked) setProductId(id);
	}

	async function handleSubscriptionSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Check user
		if (user == null) return;

		// Find product
		const product = products.find((product) => product.id === productId)!;
		const priceId = product.default_price.id;

		// Create subscription
		if (user.subscriptionId == null) {
			try {
				// Create checkout session
				const { url } = await createCheckoutSession(user.id, priceId, "/profile/categories");

				// Navigate to checkout portal
				window.location.href = url;
			} catch (err) {
				console.log("Error creating the checkout session.", err);
			}
		}
		// Update subscription
		else {
			try {
				// Check user subscription
				if (subscription == null) throw new Error("user/subscription-missing");

				// Get user subscription's product
				const userProductId = subscription.items.data[0].plan.product;

				// Check product
				if (typeof userProductId !== "string") throw new Error("product/id-missing");

				// Check same product ID
				if (userProductId === productId) throw new Error("subscription/same-plan");
			} catch (err) {
				console.log(err);
				return;
			}

			try {
				// Update subscription
				await updateSubscription(user.id, priceId);
			} catch (err) {
				console.log("Error updating the subscription.", err);
				return;
			}

			// Navigate to Profile page
			navigate("/profile");
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
				{products.map((product) => (
					<Fragment key={product.id}>
						<input
							type="radio"
							name="signUpSubscription"
							id={product.id}
							checked={productId === product.id}
							onChange={(e) => handleProductChange(e, product.id)}
						/>
						<label htmlFor={product.id}>{product.name}</label>
						<br />
					</Fragment>
				))}

				<button type="submit">Subscribe</button>
			</form>
		</div>
	);
};

export default ChangeSubscription;
