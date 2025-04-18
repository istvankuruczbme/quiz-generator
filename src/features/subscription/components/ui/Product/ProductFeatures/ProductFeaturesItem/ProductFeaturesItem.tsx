import { FC, HTMLAttributes, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import addPropClassName from "../../../../../../../utils/addPropClassName";
import "./ProductFeaturesItem.css";

type ProductFeaturesItemProps = HTMLAttributes<HTMLLIElement> & {
	text: ReactNode;
};

const ProductFeaturesItem: FC<ProductFeaturesItemProps> = ({ text, className }) => {
	return (
		<li className={`productFeaturesItem${addPropClassName(className)}`}>
			<FontAwesomeIcon icon={faLightbulb} className="productFeaturesItem__icon" />
			{text}
		</li>
	);
};

export default ProductFeaturesItem;
