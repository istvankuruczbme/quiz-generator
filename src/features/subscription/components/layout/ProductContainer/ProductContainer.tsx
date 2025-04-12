import { FC, HTMLAttributes } from "react";
import "./ProductContainer.css";

type ProductContainerProps = HTMLAttributes<HTMLDivElement>;

const ProductContainer: FC<ProductContainerProps> = ({ children }) => {
	return <div className="productContainer">{children}</div>;
};

export default ProductContainer;
