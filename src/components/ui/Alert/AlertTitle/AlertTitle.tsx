import { FC, HTMLAttributes } from "react";
import "./AlertTitle.css";
import addPropClassName from "../../../../utils/addPropClassName";

type AlertTitleProps = HTMLAttributes<HTMLHeadingElement>;

const AlertTitle: FC<AlertTitleProps> = ({ className, children }) => {
	return <h2 className={`alertTitle${addPropClassName(className)}`}>{children}</h2>;
};

export default AlertTitle;
