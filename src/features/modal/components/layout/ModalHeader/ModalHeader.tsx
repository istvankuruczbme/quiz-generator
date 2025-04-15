import { FC, HTMLAttributes } from "react";
import "./ModalHeader.css";
import addPropClassName from "../../../../../utils/addPropClassName";

type ModalHeaderProps = HTMLAttributes<HTMLDivElement>;

const ModalHeader: FC<ModalHeaderProps> = ({ className, children }) => {
	return <header className={`modalHeader${addPropClassName(className)}`}>{children}</header>;
};

export default ModalHeader;
