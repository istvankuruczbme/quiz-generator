import { CSSProperties, FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../utils/addPropClassName";
import "./SectionTitle.css";

type SectionTitleProps = HTMLAttributes<HTMLDivElement> & {
	mb?: string;
};

const SectionTitle: FC<SectionTitleProps> = ({ mb = "1rem", className, children }) => {
	// #region Variables
	const style: CSSProperties & { "--mb": string } = { "--mb": mb };
	// #endregion

	return (
		<h2 style={style} className={`sectionTitle${addPropClassName(className)}`}>
			{children}
		</h2>
	);
};

export default SectionTitle;
