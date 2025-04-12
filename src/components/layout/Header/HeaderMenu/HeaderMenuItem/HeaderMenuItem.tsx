import { FC, HTMLAttributes, ReactNode } from "react";
import "./HeaderMenuItem.css";
import addPropClassName from "../../../../../utils/addPropClassName";
import { NavLink } from "react-router-dom";

type HeaderMenuItemProps = HTMLAttributes<HTMLLIElement> & {
	to: string;
	label: string | ReactNode;
};

const HeaderMenuItem: FC<HeaderMenuItemProps> = ({ to, label, className }) => {
	return (
		<li className={`headerMenuItem${addPropClassName(className)}`}>
			<NavLink
				to={to}
				className={({ isActive }) =>
					`headerMenuItem__link${isActive ? " headerMenuItem__link--active" : ""}`
				}
			>
				{label}
			</NavLink>
		</li>
	);
};

export default HeaderMenuItem;
