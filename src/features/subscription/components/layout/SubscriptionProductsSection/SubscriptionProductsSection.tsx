import { FC, HTMLAttributes } from "react";
// Components
import Section from "../../../../../components/layout/Section/Section";
import ProductContainer from "../ProductContainer/ProductContainer";
import useProducts from "../../../../product/contexts/ProductsContext/useProducts";
import Product from "../../ui/Product/Product";
import Suspense from "../../../../../components/layout/Suspense/Suspense";
import ProductsSkeleton from "../../ui/ProductsSkeleton/ProductsSkeleton";
// CSS
import "./SubscriptionProductsSection.css";

type SubscriptionProductsSectionProps = HTMLAttributes<HTMLDivElement>;

const SubscriptionProductsSection: FC<SubscriptionProductsSectionProps> = () => {
	// #region Hooks
	const { products, loading } = useProducts();
	//#endregion

	return (
		<Section>
			<Section.Title>Subscriptions</Section.Title>

			<Suspense loading={loading} fallback={<ProductsSkeleton />}>
				<ProductContainer>
					{products.map((product) => (
						<Product key={product.id} product={product} />
					))}
				</ProductContainer>
			</Suspense>
		</Section>
	);
};

export default SubscriptionProductsSection;
