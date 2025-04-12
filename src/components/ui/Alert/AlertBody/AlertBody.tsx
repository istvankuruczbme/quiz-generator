import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../utils/addPropClassName";
import "./AlertBody.css";

type AlertBodyProps = HTMLAttributes<HTMLDivElement>;

const AlertBody: FC<AlertBodyProps> = ({ className, children }) => {
	return <div className={`alertBody${addPropClassName(className)}`}>{children}</div>;
};

export default AlertBody;
