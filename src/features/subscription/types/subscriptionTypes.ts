import Stripe from "stripe";

export type Subscription = Stripe.Product & {
	default_price: Stripe.Price;
};
