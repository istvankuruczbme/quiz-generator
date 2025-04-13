import { FC, ReactNode } from "react";
import ProductsContext from "./ProductsContext";
import useUserSubscription from "../../../user/hooks/useUserSubscription";
import useProducts from "../../hooks/useProducts";
import useDefaultProduct from "../../../auth/hooks/useDefaultProduct";

type ProductsProviderProps = {
	children: ReactNode;
};

const ProductsProvider: FC<ProductsProviderProps> = ({ children }) => {
	// #region Hooks
	const { products, loading } = useProducts();
	const { subscription } = useUserSubscription();
	const { productId } = useDefaultProduct(products, subscription);
	//#endregion

	return (
		<ProductsContext.Provider
			value={{ subscription, products, loading, userProductId: productId }}
		>
			{children}
		</ProductsContext.Provider>
	);
};

export default ProductsProvider;
