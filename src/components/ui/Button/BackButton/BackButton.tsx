import { FC } from "react";
// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LinkButton, { LinkButtonProps } from "../LinkButton/LinkButton";
// Functions
import addPropClassName from "../../../../utils/addPropClassName";
// CSS
import "./BackButton.css";

type BackButtonProps = LinkButtonProps;

const BackButton: FC<BackButtonProps> = ({ className, children, ...rest }) => {
	return (
		<LinkButton className={`backButton${addPropClassName(className)}`} {...rest}>
			<FontAwesomeIcon icon={faArrowLeft} />
			{children}
		</LinkButton>
	);
};

export default BackButton;
