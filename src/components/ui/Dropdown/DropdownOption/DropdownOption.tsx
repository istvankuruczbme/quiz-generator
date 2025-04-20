import { FC, HTMLAttributes } from "react";
import { ColorVariant } from "../../../../assets/colorVariants";
import addPropClassName from "../../../../utils/addPropClassName";
import "./DropdownOption.css";

type DropdownOptionProps = HTMLAttributes<HTMLLIElement> & {
	variant?: ColorVariant;
};

const DropdownOption: FC<DropdownOptionProps> = ({
	variant = "neutral",
	className,
	children,
	...rest
}) => {
	return (
		<li
			className={`dropdownOption dropdownOption--${variant}${addPropClassName(className)}`}
			{...rest}
		>
			{children}
		</li>
	);
};

export default DropdownOption;
