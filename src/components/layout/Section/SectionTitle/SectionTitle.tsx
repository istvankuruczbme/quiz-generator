import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../utils/addPropClassName";
import "./SectionTitle.css";

type SectionTitleProps = HTMLAttributes<HTMLDivElement>;

const SectionTitle: FC<SectionTitleProps> = ({ className, children }) => {
	return <h2 className={`sectionTitle${addPropClassName(className)}`}>{children}</h2>;
};

export default SectionTitle;
