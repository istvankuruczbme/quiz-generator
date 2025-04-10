import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../utils/addPropClassName";
import "./ModalTitle.css";

type ModalTitleProps = HTMLAttributes<HTMLHeadingElement>;

const ModalTitle: FC<ModalTitleProps> = ({ className, children }) => {
	return <h1 className={`modalTitle${addPropClassName(className)}`}>{children}</h1>;
};

export default ModalTitle;
