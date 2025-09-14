import { HTMLAttributes } from "react";
import "./CardBody.css";
import addPropClassName from "../../../../utils/addPropClassName";

type Props = HTMLAttributes<HTMLDivElement>;

const CardBody = ({ className, children }: Props) => {
	return <div className={`cardBody${addPropClassName(className)}`}>{children}</div>;
};

export default CardBody;
