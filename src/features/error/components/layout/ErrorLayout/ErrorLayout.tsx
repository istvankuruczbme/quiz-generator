import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../../utils/addPropClassName";
import "./ErrorLayout.css";

type ErrorLayoutProps = HTMLAttributes<HTMLDivElement>;

const ErrorLayout: FC<ErrorLayoutProps> = ({ className, children }) => {
	return <div className={`errorLayout${addPropClassName(className)}`}>{children}</div>;
};

export default ErrorLayout;
