import { FC, HTMLAttributes } from "react";
import AccordionHeader from "./AccordionHeader/AccordionHeader";
import addPropClassName from "../../../utils/addPropClassName";
import AccordionBody from "./AccordionBody/AccordionBody";
import "./Accordion.css";

type AccordionProps = HTMLAttributes<HTMLDetailsElement> & {
	defaultOpen?: boolean;
};
type AccordionChildren = {
	Header: typeof AccordionHeader;
	Body: typeof AccordionBody;
};
type AccordionComponent = FC<AccordionProps> & AccordionChildren;

const Accordion: AccordionComponent = ({ defaultOpen = false, className, children }) => {
	return (
		<details open={defaultOpen} className={`accordion${addPropClassName(className)}`}>
			{children}
		</details>
	);
};

Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;

export default Accordion;
