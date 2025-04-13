import { CSSProperties, FC, HTMLAttributes } from "react";
import addPropClassName from "../../../utils/addPropClassName";
import "./Skeleton.css";

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
	type?: "rect" | "circle";
	width: string;
	height: string;
};

const Skeleton: FC<SkeletonProps> = ({ type = "rect", width, height, className }) => {
	// #region Variables
	const style: CSSProperties & { "--width": string; "--height": string } = {
		"--width": width,
		"--height": height,
	};
	//#endregion

	return (
		<div
			style={style}
			className={`skeleton skeleton--${type}${addPropClassName(className)}`}
		></div>
	);
};

export default Skeleton;
