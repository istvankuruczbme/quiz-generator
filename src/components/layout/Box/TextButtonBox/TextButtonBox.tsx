import { FC } from "react";
import Box, { BoxProps } from "../Box";
import addPropClassName from "../../../../utils/addPropClassName";
import "./TextButtonBox.css";

type TextButtonBoxProps = BoxProps;

const TextButtonBox: FC<TextButtonBoxProps> = ({ variant, full, className, children }) => {
	return (
		<Box variant={variant} full={full} className={`textButtonBox${addPropClassName(className)}`}>
			{children}
		</Box>
	);
};

export default TextButtonBox;
