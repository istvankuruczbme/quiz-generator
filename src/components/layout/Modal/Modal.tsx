import { FC, HTMLAttributes } from "react";
import ModalHeader from "./ModalHeader/ModalHeader";
import ModalTitle from "./ModalTitle/ModalTitle";
import addPropClassName from "../../../utils/addPropClassName";
import ModalFooter from "./ModalFooter/ModalFooter";
import ModalBody from "./ModalBody/ModalBody";
import "./Modal.css";

type ModalProps = HTMLAttributes<HTMLDivElement>;
type ModalChildren = {
	Header: typeof ModalHeader;
	Title: typeof ModalTitle;
	Body: typeof ModalBody;
	Footer: typeof ModalFooter;
};
type ModalComponent = FC<ModalProps> & ModalChildren;

const Modal: ModalComponent = ({ className, children }) => {
	return <div className={`modal${addPropClassName(className)}`}>{children}</div>;
};

Modal.Title = ModalTitle;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
