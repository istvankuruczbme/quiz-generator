import { FC, HTMLAttributes } from "react";
import HeaderMenuItem from "./HeaderMenuItem/HeaderMenuItem";
import HeaderMenuButton from "./HeaderMenuButton/HeaderMenuButton";
import addPropClassName from "../../../../utils/addPropClassName";
import "./HeaderMenu.css";

type HeaderMenuProps = HTMLAttributes<HTMLDivElement>;
type HeaderMenuChildren = {
	Item: typeof HeaderMenuItem;
	Button: typeof HeaderMenuButton;
};
type HeaderMenuComponent = FC<HeaderMenuProps> & HeaderMenuChildren;

const HeaderMenu: HeaderMenuComponent = ({ className, children }) => {
	return <ul className={`headerMenu${addPropClassName(className)}`}>{children}</ul>;
};

HeaderMenu.Item = HeaderMenuItem;
HeaderMenu.Button = HeaderMenuButton;

export default HeaderMenu;
