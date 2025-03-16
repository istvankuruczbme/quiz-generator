import Stripe from "stripe";

export type Product = Stripe.Product & {
	default_price: Stripe.Price;
};
