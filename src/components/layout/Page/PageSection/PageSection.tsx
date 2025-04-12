import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../utils/addPropClassName";
import "./PageSection.css";
import Container from "../../Container/Container";

type PageSectionProps = HTMLAttributes<HTMLDivElement>;

const PageSection: FC<PageSectionProps> = ({ className, children, ...rest }) => {
	return (
		<div className={`pageSection${addPropClassName(className)}`} {...rest}>
			<Container className="pageSection__container">{children}</Container>
		</div>
	);
};

export default PageSection;
