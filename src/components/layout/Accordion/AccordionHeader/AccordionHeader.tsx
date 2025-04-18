import { FC, HTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import addPropClassName from "../../../../utils/addPropClassName";
import "./AccordionHeader.css";

type AccordionHeaderProps = HTMLAttributes<HTMLDivElement>;

const AccordionHeader: FC<AccordionHeaderProps> = ({ className, children }) => {
	return (
		<summary className={`accordionHeader${addPropClassName(className)}`}>
			<FontAwesomeIcon icon={faCaretRight} className="accordionHeader__icon" />
			{children}
		</summary>
	);
};

export default AccordionHeader;
