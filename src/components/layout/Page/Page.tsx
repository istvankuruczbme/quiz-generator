import { FC, HTMLAttributes } from "react";
// Components
import Header from "../Header/Header";
import PageTitle from "./PageTitle/PageTitle";
// Functions
import addPropClassName from "../../../utils/addPropClassName";
// CSS
import "./Page.css";

type PageProps = HTMLAttributes<HTMLDivElement> & {
	hasHeader?: boolean;
	hasFooter?: boolean;
};
type PageChildren = {
	Title: typeof PageTitle;
};
type PageComponent = FC<PageProps> & PageChildren;

const Page: PageComponent = ({ hasHeader = true, hasFooter = true, className, children }) => {
	return (
		<div className={`page${addPropClassName(className)}`}>
			{hasHeader && <Header />}
			<main className="page__main">{children}</main>
			{hasFooter && <div className="footer">Footer</div>}
		</div>
	);
};

Page.Title = PageTitle;

export default Page;
