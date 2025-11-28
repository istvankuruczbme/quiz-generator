import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../utils/addPropClassName";
import logo from "../../../assets/logo.png";
import "./Logo.css";

type LogoProps = HTMLAttributes<HTMLDivElement>;

const Logo: FC<LogoProps> = ({ className }) => {
	return (
		<div className={`logo${addPropClassName(className)}`}>
			<img src={logo} alt="Logo" className="logo__img" />
			<span className="logo__text">Quiz generator</span>
		</div>
	);
};

export default Logo;
