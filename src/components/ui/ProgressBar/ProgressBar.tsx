import { CSSProperties, HTMLAttributes } from "react";
import "./ProgressBar.css";
import addPropClassName from "../../../utils/addPropClassName";

type Props = HTMLAttributes<HTMLDivElement> & {
	value: number;
	max: number;
};

const ProgressBar = ({ value, max, className }: Props) => {
	// #region Constants
	const styles: CSSProperties & { "--width": string } = { "--width": `${(value / max) * 100}%` };
	//#endregion

	return <div style={styles} className={`progressBar${addPropClassName(className)}`}></div>;
};

export default ProgressBar;
