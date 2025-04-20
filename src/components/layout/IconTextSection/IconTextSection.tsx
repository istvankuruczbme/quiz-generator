import { FC, HTMLAttributes, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import addPropClassName from "../../../utils/addPropClassName";
import "./IconTextSection.css";

type IconTextSectionProps = HTMLAttributes<HTMLDivElement> & {
	icon: IconDefinition;
	text: ReactNode;
};

const IconTextSection: FC<IconTextSectionProps> = ({ icon, text, className }) => {
	return (
		<div className={`iconTextSection${addPropClassName(className)}`}>
			<FontAwesomeIcon icon={icon} className="iconTextSection__icon" />
			<div className="iconTextSection__text">{text}</div>
		</div>
	);
};

export default IconTextSection;
