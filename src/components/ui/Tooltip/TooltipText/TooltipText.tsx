import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../utils/addPropClassName";
import "./TooltipText.css";

type TooltipTextProps = HTMLAttributes<HTMLDivElement>;

const TooltipText: FC<TooltipTextProps> = ({ className, children }) => {
	return <p className={`tooltipText${addPropClassName(className)}`}>{children}</p>;
};

export default TooltipText;
