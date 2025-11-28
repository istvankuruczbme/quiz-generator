import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../utils/addPropClassName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import "./Logo.css";

type LogoProps = HTMLAttributes<HTMLDivElement>;

const Logo: FC<LogoProps> = ({ className }) => {
	return (
		<div className={`logo${addPropClassName(className)}`}>
			<FontAwesomeIcon icon={faLightbulb} className="logo__icon" />
			<span className="logo__text">Quiz generator</span>
		</div>
	);
};

export default Logo;
