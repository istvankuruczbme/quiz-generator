import { FC, HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../ui/Logo/Logo";
import AppName from "../../../ui/AppName/AppName";
import "./HeaderHome.css";

type HeaderHomeProps = HTMLAttributes<HTMLAnchorElement>;

const HeaderHome: FC<HeaderHomeProps> = () => {
	return (
		<Link to="/" className="headerHome">
			<Logo />
			<AppName />
		</Link>
	);
};

export default HeaderHome;
