import Stripe from "stripe";
import { Product } from "../types/productTypes";
import { createContext } from "react";

type ProductsContextType = {
	products: Product[];
	userProductId: string | null;
	subscription: Stripe.Subscription | null;
};

const ProductsContext = createContext<ProductsContextType>({
	products: [],
	userProductId: null,
	subscription: null,
});

export default ProductsContext;
