import Stripe from "stripe";
import { Product } from "../../types/productTypes";
import { createContext } from "react";

type ProductsContextType = {
	products: Product[];
	loading: boolean;
	userProductId: string | null;
	subscription: Stripe.Subscription | null;
};

const ProductsContext = createContext<ProductsContextType>({
	products: [],
	loading: false,
	userProductId: null,
	subscription: null,
});

export default ProductsContext;
