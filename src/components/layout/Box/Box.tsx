import { FC, HTMLAttributes } from "react";
import { ColorVariant } from "../../../assets/colorVariants";
import addPropClassName from "../../../utils/addPropClassName";
import "./Box.css";

type BoxProps = HTMLAttributes<HTMLDivElement> & {
	variant?: ColorVariant;
	full?: boolean;
};

const Box: FC<BoxProps> = ({ variant = "secondary", full = false, className, children }) => {
	return (
		<div
			className={`box box--${variant}${full ? " box--full" : ""}${addPropClassName(className)}`}
		>
			{children}
		</div>
	);
};

export default Box;
