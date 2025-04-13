import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../../utils/addPropClassName";
import "./CategoriesContainer.css";

type CategoriesContainerProps = HTMLAttributes<HTMLDivElement>;

const CategoriesContainer: FC<CategoriesContainerProps> = ({ className, children }) => {
	return <div className={`categoriesContainer${addPropClassName(className)}`}>{children}</div>;
};

export default CategoriesContainer;
