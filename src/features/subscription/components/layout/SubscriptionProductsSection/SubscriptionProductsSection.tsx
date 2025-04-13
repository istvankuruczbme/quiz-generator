import { FC, HTMLAttributes } from "react";
// Components
import Section from "../../../../../components/layout/Section/Section";
import ProductContainer from "../ProductContainer/ProductContainer";
import useProducts from "../../../../product/contexts/ProductsContext/useProducts";
import Product from "../../ui/Product/Product";
// CSS
import "./SubscriptionProductsSection.css";
import Skeleton from "../../../../../components/ui/Skeleton/Skeleton";

type SubscriptionProductsSectionProps = HTMLAttributes<HTMLDivElement>;

const SubscriptionProductsSection: FC<SubscriptionProductsSectionProps> = () => {
	// #region Hooks
	const { products, loading } = useProducts();
	//#endregion

	return (
		<Section>
			<Section.Title>Subscriptions</Section.Title>

			<ProductContainer>
				{loading && (
					<>
						<Skeleton type="rect" width="300px" height="450px" />
						<Skeleton type="rect" width="300px" height="450px" />
						<Skeleton type="rect" width="300px" height="450px" />
					</>
				)}
				{!loading && products.map((product) => <Product key={product.id} product={product} />)}
			</ProductContainer>
		</Section>
	);
};

export default SubscriptionProductsSection;
