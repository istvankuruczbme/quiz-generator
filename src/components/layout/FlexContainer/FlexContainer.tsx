import { CSSProperties, FC, HTMLAttributes } from "react";
import addPropClassName from "../../../utils/addPropClassName";
import "./FlexContainer.css";

type FlexContainerProps = HTMLAttributes<HTMLDivElement> & {
	direction?: "row" | "column";
	wrap?: "576px" | "768px" | "992px" | "1200px";
	gap?: string;
	mb?: string;
};

const FlexContainer: FC<FlexContainerProps> = ({
	direction = "row",
	wrap,
	gap = "1rem",
	mb = "0",
	className,
	children,
}) => {
	// #region Variables
	const style: CSSProperties & {
		"--direction": "row" | "column";
		"--gap": string;
		"--mb": string;
	} = {
		"--direction": direction,
		"--gap": gap,
		"--mb": mb,
	};
	// #endregion

	return (
		<div
			style={style}
			className={`flexContainer${wrap ? ` flexContainer--wrap-${wrap}` : ""}${addPropClassName(
				className
			)}`}
		>
			{children}
		</div>
	);
};

export default FlexContainer;
