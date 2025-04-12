import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../utils/addPropClassName";
import "./PageTitle.css";

type PageTitleProps = HTMLAttributes<HTMLDivElement>;

const PageTitle: FC<PageTitleProps> = ({ className, children }) => {
	return <h1 className={`pageTitle${addPropClassName(className)}`}>{children}</h1>;
};

export default PageTitle;
