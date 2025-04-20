import { FC, HTMLAttributes } from "react";
import TooltipText from "./TooltipText/TooltipText";
import addPropClassName from "../../../utils/addPropClassName";
import "./Tooltip.css";

type TooltipProps = HTMLAttributes<HTMLDivElement> & {
	align?: "top" | "right" | "bottom" | "left";
};
type TooltipChildren = {
	Text: typeof TooltipText;
};
type TooltipComponent = FC<TooltipProps> & TooltipChildren;

const Tooltip: TooltipComponent = ({ align = "top", className, children }) => {
	return (
		<div className={`tooltip tooltip--${align}${addPropClassName(className)}`}>{children}</div>
	);
};

Tooltip.Text = TooltipText;

export default Tooltip;
