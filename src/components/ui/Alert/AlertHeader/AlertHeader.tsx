import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../utils/addPropClassName";
import "./AlertHeader.css";

type AlertHeaderProps = HTMLAttributes<HTMLDivElement>;

const AlertHeader: FC<AlertHeaderProps> = ({ className, children }) => {
	return <header className={`alertHeader${addPropClassName(className)}`}>{children}</header>;
};

export default AlertHeader;
