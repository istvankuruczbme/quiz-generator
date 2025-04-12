import { FC, HTMLAttributes } from "react";
import ProductFeaturesItem from "./ProductFeaturesItem/ProductFeaturesItem";
import addPropClassName from "../../../../../../utils/addPropClassName";
import "./ProductFeatures.css";

type ProductFeaturesProps = HTMLAttributes<HTMLUListElement>;
type ProductFeaturesChildren = {
	Item: typeof ProductFeaturesItem;
};
type ProductFeaturesComponent = FC<ProductFeaturesProps> & ProductFeaturesChildren;

const ProductFeatures: ProductFeaturesComponent = ({ className, children }) => {
	return <ul className={`productFeatures${addPropClassName(className)}`}>{children}</ul>;
};

ProductFeatures.Item = ProductFeaturesItem;

export default ProductFeatures;
