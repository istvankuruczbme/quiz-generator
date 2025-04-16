import { FC, HTMLAttributes } from "react";
// Components
import Container from "../Container/Container";
import SectionTitle from "./SectionTitle/SectionTitle";
// Functions
import addPropClassName from "../../../utils/addPropClassName";
// Variables
import { CONTAINER_MAX_WIDTH } from "../../../assets/uiConstants";
// CSS
import "./Section.css";

type SectionProps = HTMLAttributes<HTMLDivElement> & {
	maxWidth?: string;
};
type SectionChildren = {
	Title: typeof SectionTitle;
};
type SectionComponent = FC<SectionProps> & SectionChildren;

const Section: SectionComponent = ({
	maxWidth = CONTAINER_MAX_WIDTH,
	className,
	children,
	...rest
}) => {
	return (
		<div className={`section${addPropClassName(className)}`} {...rest}>
			<Container maxWidth={maxWidth} className="section__container">
				{children}
			</Container>
		</div>
	);
};

Section.Title = SectionTitle;

export default Section;
