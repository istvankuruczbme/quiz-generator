import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../../utils/addPropClassName";
import "./HeaderSidebarMenu.css";

type HeaderSidebarMenuProps = HTMLAttributes<HTMLUListElement>;

const HeaderSidebarMenu: FC<HeaderSidebarMenuProps> = ({ className, children }) => {
	return <ul className={`headerSidebarMenu${addPropClassName(className)}`}>{children}</ul>;
};

export default HeaderSidebarMenu;
