import { CSSProperties, FC, HTMLAttributes } from "react";
import { ColorVariant } from "../../../assets/colorVariants";
import addPropClassName from "../../../utils/addPropClassName";
import "./Text.css";

type TextProps = HTMLAttributes<HTMLParagraphElement> & {
	variant?: ColorVariant | "neutral-400" | "neutral-700";
	mb?: string;
};

const Text: FC<TextProps> = ({ variant = "neutral-700", mb = "1rem", className, children }) => {
	// #region Variables
	const style: CSSProperties & { "--mb": string } = { "--mb": mb };
	// #endregion

	return (
		<p style={style} className={`text text--${variant}${addPropClassName(className)}`}>
			{children}
		</p>
	);
};

export default Text;
