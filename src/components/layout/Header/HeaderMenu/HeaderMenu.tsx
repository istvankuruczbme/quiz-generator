import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../utils/addPropClassName";
import "./HeaderMenu.css";
import HeaderMenuItem from "./HeaderMenuItem/HeaderMenuItem";

type HeaderMenuProps = HTMLAttributes<HTMLDivElement>;
type HeaderMenuChildren = {
	Item: typeof HeaderMenuItem;
};
type HeaderMenuComponent = FC<HeaderMenuProps> & HeaderMenuChildren;

const HeaderMenu: HeaderMenuComponent = ({ className, children }) => {
	return <ul className={`headerMenu${addPropClassName(className)}`}>{children}</ul>;
};

HeaderMenu.Item = HeaderMenuItem;

export default HeaderMenu;
