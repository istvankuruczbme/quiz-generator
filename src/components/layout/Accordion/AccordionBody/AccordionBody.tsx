import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../utils/addPropClassName";
import "./AccordionBody.css";

type AccordionBodyProps = HTMLAttributes<HTMLDivElement>;

const AccordionBody: FC<AccordionBodyProps> = ({ className, children }) => {
	return <div className={`accordionBody${addPropClassName(className)}`}>{children}</div>;
};

export default AccordionBody;
