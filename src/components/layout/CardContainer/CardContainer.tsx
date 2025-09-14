import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../utils/addPropClassName";
import "./CardContainer.css";

type CardContainerProps = HTMLAttributes<HTMLDivElement>;

const CardContainer: FC<CardContainerProps> = ({ className, children }) => {
	return <div className={`cardContainer${addPropClassName(className)}`}>{children}</div>;
};

export default CardContainer;
