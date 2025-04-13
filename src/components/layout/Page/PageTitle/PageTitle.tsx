import { CSSProperties, FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../utils/addPropClassName";
import "./PageTitle.css";

type PageTitleProps = HTMLAttributes<HTMLDivElement> & {
	mb?: string;
};

const PageTitle: FC<PageTitleProps> = ({ mb = "1rem", className, children }) => {
	// #region Variables
	const style: CSSProperties & { "--mb": string } = { "--mb": mb };
	// #endregion

	return (
		<h1 style={style} className={`pageTitle${addPropClassName(className)}`}>
			{children}
		</h1>
	);
};

export default PageTitle;
