import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../utils/addPropClassName";
import logo from "../../../assets/logo.png";
import "./Logo.css";

type LogoProps = HTMLAttributes<HTMLDivElement>;

const Logo: FC<LogoProps> = ({ className }) => {
	return <img src={logo} alt="Logo" className={`logo${addPropClassName(className)}`} />;
};

export default Logo;
