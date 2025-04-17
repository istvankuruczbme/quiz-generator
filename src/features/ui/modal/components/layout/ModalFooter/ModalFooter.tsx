import { FC, HTMLAttributes } from "react";
import "./ModalFooter.css";
import addPropClassName from "../../../../../../utils/addPropClassName";

type ModalFooterProps = HTMLAttributes<HTMLDivElement>;

const ModalFooter: FC<ModalFooterProps> = ({ className, children }) => {
	return <footer className={`modalFooter${addPropClassName(className)}`}>{children}</footer>;
};

export default ModalFooter;
