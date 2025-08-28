import ProductContainer from "../../layout/ProductContainer/ProductContainer";
import ProductSkeleton from "../Product/ProductSkeleton/ProductSkeleton";

const ProductsSkeleton = () => {
	return (
		<ProductContainer>
			<ProductSkeleton />
			<ProductSkeleton />
			<ProductSkeleton />
		</ProductContainer>
	);
};

export default ProductsSkeleton;
