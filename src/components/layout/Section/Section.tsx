import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../utils/addPropClassName";
import Container from "../Container/Container";
import "./Section.css";
import SectionTitle from "./SectionTitle/SectionTitle";

type SectionProps = HTMLAttributes<HTMLDivElement>;
type SectionChildren = {
	Title: typeof SectionTitle;
};
type SectionComponent = FC<SectionProps> & SectionChildren;

const Section: SectionComponent = ({ className, children, ...rest }) => {
	return (
		<div className={`section${addPropClassName(className)}`} {...rest}>
			<Container className="section__container">{children}</Container>
		</div>
	);
};

Section.Title = SectionTitle;

export default Section;
