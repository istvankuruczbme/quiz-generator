import { CSSProperties, FC, HTMLAttributes, ReactNode } from "react";
import addPropClassName from "../../../utils/addPropClassName";
import "./Divider.css";

type DividerProps = HTMLAttributes<HTMLDivElement> & {
	text?: ReactNode;
	my?: string;
};

const Divider: FC<DividerProps> = ({ text, my = "1rem", className }) => {
	// #region Variables
	const style: CSSProperties & { "--my": string } = { "--my": my };
	// #endregion

	return (
		<div style={style} className={`divider${addPropClassName(className)}`}>
			{text != undefined && <span className="divider__text">{text}</span>}
		</div>
	);
};

export default Divider;
