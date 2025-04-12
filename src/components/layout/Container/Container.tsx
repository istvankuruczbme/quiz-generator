import { CSSProperties, FC, HTMLAttributes } from "react";
import addPropClassName from "../../../utils/addPropClassName";
import { CONTAINER_MAX_WIDTH } from "../../../assets/uiConstants";
import "./Container.css";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
	maxWidth?: string;
	centered?: boolean;
};

const Container: FC<ContainerProps> = ({
	maxWidth = CONTAINER_MAX_WIDTH,
	centered = true,
	className,
	children,
}) => {
	// #region Variables
	const style: CSSProperties & { "--max-width": string } = {
		"--max-width": maxWidth,
	};
	// #endregion

	return (
		<div
			style={style}
			className={`container${centered ? " container--centered" : ""}${addPropClassName(
				className
			)}`}
		>
			{children}
		</div>
	);
};

export default Container;
