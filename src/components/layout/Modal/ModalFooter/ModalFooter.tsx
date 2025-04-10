import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../utils/addPropClassName";
import "./ModalFooter.css";

type ModalFooterProps = HTMLAttributes<HTMLDivElement>;

const ModalFooter: FC<ModalFooterProps> = ({ className, children }) => {
	return <footer className={`modalFooter${addPropClassName(className)}`}>{children}</footer>;
};

export default ModalFooter;
