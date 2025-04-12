import { FC, HTMLAttributes } from "react";
import Container from "../../Container/Container";
import addPropClassName from "../../../../utils/addPropClassName";
import "./HeaderLayout.css";

type HeaderLayoutProps = HTMLAttributes<HTMLDivElement>;

const HeaderLayout: FC<HeaderLayoutProps> = ({ className, children }) => {
	return (
		<div className={`headerLayout${addPropClassName(className)}`}>
			<Container className="headerLayout__container">{children}</Container>
		</div>
	);
};

export default HeaderLayout;
