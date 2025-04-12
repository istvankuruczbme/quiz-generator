import { ButtonHTMLAttributes, forwardRef } from "react";
import { ColorVariant } from "../../../assets/colorVariants";
// Functions
import addPropClassName from "../../../utils/addPropClassName";
// CSS
import "./Button.css";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	type?: HTMLButtonElement["type"];
	variant?: ColorVariant;
	outlined?: boolean;
	rounded?: boolean;
	centered?: boolean;
	full?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			type = "button",
			variant = "accent",
			outlined = false,
			rounded = true,
			centered = false,
			full = false,
			className,
			children,
			...rest
		},
		ref
	) => {
		return (
			<button
				type={type}
				className={`button button--${variant}${outlined ? " button--outlined" : ""}${
					rounded ? " button--rounded" : ""
				}${centered ? " button--centered" : ""}${full ? " button--full" : ""}${addPropClassName(
					className
				)}`}
				{...rest}
				ref={ref}
			>
				{children}
			</button>
		);
	}
);

export default Button;
